import { f as fail } from "../../../../chunks/constants.js";
import { m as mapErrors, d as clone, S as SuperFormError, n as entityData, u as unwrapZodType, v as valueOrDefault, p as parse, l as contactSchema } from "../../../../chunks/schema.js";
function formDataToValidation(data, schemaData, preprocessed) {
  const strictData = {};
  const parsedData = {};
  const { schemaKeys, entityInfo } = schemaData;
  for (const key of schemaKeys) {
    const typeInfo = entityInfo.typeInfo[key];
    const entries = data.getAll(key);
    if (!(typeInfo.zodType._def.typeName == "ZodArray")) {
      parsedData[key] = parseSingleEntry(key, entries[0], typeInfo);
    } else {
      const arrayType = unwrapZodType(typeInfo.zodType._def.type);
      parsedData[key] = entries.map((e) => parseSingleEntry(key, e, arrayType));
    }
    if (!entries.length && !typeInfo.isOptional) {
      strictData[key] = void 0;
    } else {
      strictData[key] = parsedData[key];
    }
  }
  for (const key of Object.keys(strictData)) {
    if (strictData[key] === void 0)
      delete strictData[key];
  }
  return { parsed: parsedData, partial: strictData };
  function parseSingleEntry(key, entry, typeInfo) {
    if (preprocessed && preprocessed.includes(key)) {
      return entry;
    }
    if (entry && typeof entry !== "string") {
      return void 0;
    }
    return parseFormDataEntry(key, entry, typeInfo);
  }
  function parseFormDataEntry(field, value, typeInfo) {
    const newValue = valueOrDefault(value, typeInfo);
    const zodType = typeInfo.zodType;
    const typeName = zodType._def.typeName;
    if (!value && typeName != "ZodBoolean") {
      return newValue;
    }
    if (typeName == "ZodString") {
      return value;
    } else if (typeName == "ZodNumber") {
      return zodType.isInt ? parseInt(value ?? "", 10) : parseFloat(value ?? "");
    } else if (typeName == "ZodBoolean") {
      return Boolean(value == "false" ? "" : value).valueOf();
    } else if (typeName == "ZodDate") {
      return new Date(value ?? "");
    } else if (typeName == "ZodArray") {
      const arrayType = unwrapZodType(zodType._def.type);
      return parseFormDataEntry(field, value, arrayType);
    } else if (typeName == "ZodBigInt") {
      try {
        return BigInt(value ?? ".");
      } catch {
        return NaN;
      }
    } else if (typeName == "ZodLiteral") {
      const literalType = typeof zodType.value;
      if (literalType === "string")
        return value;
      else if (literalType === "number")
        return parseFloat(value ?? "");
      else if (literalType === "boolean")
        return Boolean(value).valueOf();
      else {
        throw new SuperFormError("Unsupported ZodLiteral type: " + literalType);
      }
    } else if (typeName == "ZodUnion" || typeName == "ZodEnum" || typeName == "ZodAny") {
      return value;
    } else if (typeName == "ZodNativeEnum") {
      const zodEnum = zodType;
      if (value !== null && value in zodEnum.enum) {
        const enumValue = zodEnum.enum[value];
        if (typeof enumValue === "number")
          return enumValue;
        else if (enumValue in zodEnum.enum)
          return zodEnum.enum[enumValue];
      } else if (value !== null && Object.values(zodEnum.enum).includes(value)) {
        return value;
      }
      return void 0;
    } else if (typeName == "ZodSymbol") {
      return Symbol(String(value));
    }
    if (typeName == "ZodObject") {
      throw new SuperFormError(`Object found in form field "${field}". Set the dataType option to "json" and add use:enhance on the client to use nested data structures. More information: https://superforms.rocks/concepts/nested-data`);
    }
    throw new SuperFormError("Unsupported Zod default type: " + zodType.constructor.name);
  }
}
function dataToValidate(parsed, schemaData) {
  const strict = schemaData.opts?.strict ?? false;
  if (!parsed.data) {
    return schemaData.hasEffects || schemaData.opts.errors === true ? schemaData.entityInfo.defaultEntity : void 0;
  } else if (strict && parsed.partialData) {
    return parsed.partialData;
  } else
    return parsed.data;
}
function parseFormData(formData, schemaData, preprocessed) {
  function tryParseSuperJson() {
    if (formData.has("__superform_json")) {
      try {
        const output = parse(formData.getAll("__superform_json").join("") ?? "");
        if (typeof output === "object") {
          return output;
        }
      } catch {
      }
    }
    return null;
  }
  const data = tryParseSuperJson();
  const id = formData.get("__superform_id")?.toString() ?? void 0;
  if (data) {
    return { id, data, posted: true, partialData: null };
  }
  const parsed = formDataToValidation(formData, schemaData, preprocessed);
  return {
    id,
    data: parsed.parsed,
    partialData: parsed.partial,
    posted: true
  };
}
function parseSearchParams(data, schemaData, preprocessed) {
  if (data instanceof URL)
    data = data.searchParams;
  const convert = new FormData();
  for (const [key, value] of data.entries()) {
    convert.append(key, value);
  }
  const output = parseFormData(convert, schemaData, preprocessed);
  output.posted = false;
  return output;
}
function validateResult(parsed, schemaData, result) {
  const { opts: options, entityInfo } = schemaData;
  const posted = parsed.posted;
  const id = parsed.data ? options.id ?? parsed.id ?? entityInfo.hash : options.id ?? entityInfo.hash;
  if (!parsed.data) {
    let data = void 0;
    let errors = {};
    const valid = result?.success ?? false;
    const addErrors = options.errors ?? options.strict;
    if (result) {
      if (result.success) {
        data = result.data;
      } else if (addErrors) {
        errors = mapErrors(result.error.format(), entityInfo.errorShape);
      }
    }
    return {
      id,
      valid,
      posted,
      errors,
      // Copy the default entity so it's not modified
      data: data ?? clone(entityInfo.defaultEntity),
      constraints: entityInfo.constraints
    };
  } else {
    const { opts: options2, schemaKeys, entityInfo: entityInfo2, unwrappedSchema } = schemaData;
    if (!result) {
      throw new SuperFormError("Validation data exists without validation result.");
    }
    if (!result.success) {
      const partialData = parsed.data;
      const errors = options2.errors !== false ? mapErrors(result.error.format(), entityInfo2.errorShape) : {};
      const zodKeyStatus = unwrappedSchema._def.unknownKeys;
      let data;
      if (options2.strict) {
        data = parsed.data;
      } else if (zodKeyStatus == "passthrough") {
        data = { ...clone(entityInfo2.defaultEntity), ...partialData };
      } else {
        data = Object.fromEntries(schemaKeys.map((key) => [
          key,
          key in partialData ? partialData[key] : clone(entityInfo2.defaultEntity[key])
        ]));
      }
      return {
        id,
        valid: false,
        posted,
        errors,
        data,
        constraints: entityInfo2.constraints
      };
    } else {
      return {
        id,
        valid: true,
        posted,
        errors: {},
        data: result.data,
        constraints: entityInfo2.constraints
      };
    }
  }
}
function getSchemaData(schema, options) {
  const originalSchema = schema;
  let unwrappedSchema = schema;
  let hasEffects = false;
  while (unwrappedSchema._def.typeName == "ZodEffects") {
    hasEffects = true;
    unwrappedSchema = unwrappedSchema._def.schema;
  }
  if (!(unwrappedSchema._def.typeName == "ZodObject")) {
    throw new SuperFormError("Only Zod schema objects can be used with superValidate. Define the schema with z.object({ ... }) and optionally refine/superRefine/transform at the end.");
  }
  const entityInfo = entityData(unwrappedSchema, options?.warnings);
  return {
    originalSchema,
    unwrappedSchema,
    hasEffects,
    entityInfo,
    schemaKeys: entityInfo.keys,
    opts: options ?? {}
  };
}
async function superValidate(data, schema, options) {
  if (data && typeof data === "object" && "safeParseAsync" in data) {
    options = schema;
    schema = data;
    data = null;
  }
  const schemaData = getSchemaData(schema, options);
  async function tryParseFormData(request) {
    let formData = void 0;
    try {
      formData = await request.formData();
    } catch (e) {
      if (e instanceof TypeError && e.message.includes("already been consumed")) {
        throw e;
      }
      return {
        id: void 0,
        data: void 0,
        posted: false,
        partialData: void 0
      };
    }
    return parseFormData(formData, schemaData, options?.preprocessed);
  }
  async function parseRequest() {
    let parsed2;
    if (data instanceof FormData) {
      parsed2 = parseFormData(data, schemaData, options?.preprocessed);
    } else if (data instanceof URL || data instanceof URLSearchParams) {
      parsed2 = parseSearchParams(data, schemaData, options?.preprocessed);
    } else if (data instanceof Request) {
      parsed2 = await tryParseFormData(data);
    } else if (data && typeof data === "object" && "request" in data && data.request instanceof Request) {
      parsed2 = await tryParseFormData(data.request);
    } else if (options?.strict) {
      const params = new URLSearchParams(data);
      parsed2 = parseSearchParams(params, schemaData, options?.preprocessed);
    } else {
      parsed2 = {
        id: void 0,
        posted: false,
        data,
        partialData: data
      };
    }
    const toValidate = dataToValidate(parsed2, schemaData);
    const result2 = toValidate ? await schemaData.originalSchema.safeParseAsync(toValidate) : void 0;
    return { parsed: parsed2, result: result2 };
  }
  const { parsed, result } = await parseRequest();
  const superValidated = validateResult(parsed, schemaData, result);
  return superValidated;
}
const load = async () => {
  return {
    form: await superValidate(contactSchema)
  };
};
const actions = {
  default: async (event) => {
    const form = await superValidate(event, contactSchema);
    console.log(form);
    if (!form.valid) {
      return fail(400, {
        form
      });
    }
    return {
      form
    };
  }
};
export {
  actions,
  load
};
