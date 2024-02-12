import { c as create_ssr_component, h as compute_rest_props, a as subscribe, i as spread, k as escape_object, b as add_attribute, o as onDestroy, g as get_store_value, s as setContext, n as noop, d as escape, p as is_promise, v as validate_component, f as getContext, j as escape_attribute_value, e as each } from "../../../../chunks/ssr.js";
import { f as addMeltEventListener, m as is_void, o as cn, B as Button, a6 as name, a7 as email, a8 as message, a9 as submit, aa as contact_page_heading, ab as contact_page_description } from "../../../../chunks/messages.js";
import { w as writable, d as derived, a as readonly, r as readable } from "../../../../chunks/index.js";
import { i as invalidateAll, a as applyAction, p as page, n as navigating } from "../../../../chunks/stores.js";
import { p as parse, t as traversePath, s as splitPath, S as SuperFormError, c as clone$1, u as updateErrors, a as comparePaths, b as setPaths, f as flattenErrors, d as pathExists, m as mapErrors, e as mergePath, g as traversePaths, h as contactSchema } from "../../../../chunks/schema.js";
import { B as BROWSER, b as stringify } from "../../../../chunks/stringify.js";
import { b as builder, a as createBitAttrs, d as createDispatcher, t as tick } from "../../../../chunks/events.js";
import "../../../../chunks/constants.js";
import "clsx";
const browser = BROWSER;
function createLabel() {
  const root = builder("label", {
    action: (node) => {
      const mouseDown = addMeltEventListener(node, "mousedown", (e) => {
        if (!e.defaultPrevented && e.detail > 1) {
          e.preventDefault();
        }
      });
      return {
        destroy: mouseDown
      };
    }
  });
  return {
    elements: {
      root
    }
  };
}
function getLabelData() {
  const NAME = "label";
  const PARTS = ["root"];
  const getAttrs = createBitAttrs(NAME, PARTS);
  return {
    NAME,
    getAttrs
  };
}
const Label$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder2;
  let $$restProps = compute_rest_props($$props, ["asChild", "el"]);
  let $root, $$unsubscribe_root;
  let { asChild = false } = $$props;
  let { el = void 0 } = $$props;
  const { elements: { root } } = createLabel();
  $$unsubscribe_root = subscribe(root, (value) => $root = value);
  createDispatcher();
  const { getAttrs } = getLabelData();
  const attrs = getAttrs("root");
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0)
    $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0)
    $$bindings.el(el);
  builder2 = $root;
  {
    Object.assign(builder2, attrs);
  }
  $$unsubscribe_root();
  return `${asChild ? `${slots.default ? slots.default({ builder: builder2 }) : ``}` : `<label${spread([escape_object(builder2), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder: builder2 }) : ``}</label>`}`;
});
function cancelFlash(options) {
  if (!options.flashMessage || !browser)
    return;
  if (!shouldSyncFlash(options))
    return;
  document.cookie = `flash=; Max-Age=0; Path=${options.flashMessage.cookiePath ?? "/"};`;
}
function shouldSyncFlash(options) {
  if (!options.flashMessage || !browser)
    return false;
  return options.syncFlashMessage;
}
function deserialize(result) {
  const parsed = JSON.parse(result);
  if (parsed.data) {
    parsed.data = parse(parsed.data);
  }
  return parsed;
}
function clone(element) {
  return (
    /** @type {T} */
    HTMLElement.prototype.cloneNode.call(element)
  );
}
function enhance(form_element, submit2 = () => {
}) {
  const fallback_callback = async ({
    action,
    result,
    reset = true,
    invalidateAll: shouldInvalidateAll = true
  }) => {
    if (result.type === "success") {
      if (reset) {
        HTMLFormElement.prototype.reset.call(form_element);
      }
      if (shouldInvalidateAll) {
        await invalidateAll();
      }
    }
    if (location.origin + location.pathname === action.origin + action.pathname || result.type === "redirect" || result.type === "error") {
      applyAction();
    }
  };
  async function handle_submit(event) {
    const method = event.submitter?.hasAttribute("formmethod") ? (
      /** @type {HTMLButtonElement | HTMLInputElement} */
      event.submitter.formMethod
    ) : clone(form_element).method;
    if (method !== "post")
      return;
    event.preventDefault();
    const action = new URL(
      // We can't do submitter.formAction directly because that property is always set
      event.submitter?.hasAttribute("formaction") ? (
        /** @type {HTMLButtonElement | HTMLInputElement} */
        event.submitter.formAction
      ) : clone(form_element).action
    );
    const form_data = new FormData(form_element);
    const submitter_name = event.submitter?.getAttribute("name");
    if (submitter_name) {
      form_data.append(submitter_name, event.submitter?.getAttribute("value") ?? "");
    }
    const controller = new AbortController();
    let cancelled = false;
    const cancel = () => cancelled = true;
    const callback = await submit2({
      action,
      cancel,
      controller,
      formData: form_data,
      formElement: form_element,
      submitter: event.submitter
    }) ?? fallback_callback;
    if (cancelled)
      return;
    let result;
    try {
      const response = await fetch(action, {
        method: "POST",
        headers: {
          accept: "application/json",
          "x-sveltekit-action": "true"
        },
        cache: "no-store",
        body: form_data,
        signal: controller.signal
      });
      result = deserialize(await response.text());
      if (result.type === "error")
        result.status = response.status;
    } catch (error) {
      if (
        /** @type {any} */
        error?.name === "AbortError"
      )
        return;
      result = { type: "error", error };
    }
    callback({
      action,
      formData: form_data,
      formElement: form_element,
      update: (opts) => fallback_callback({
        action,
        result,
        reset: opts?.reset,
        invalidateAll: opts?.invalidateAll
      }),
      // @ts-expect-error generic constraints stuff we don't care about
      result
    });
  }
  HTMLFormElement.prototype.addEventListener.call(form_element, "submit", handle_submit);
  return {
    destroy() {
      HTMLFormElement.prototype.removeEventListener.call(form_element, "submit", handle_submit);
    }
  };
}
const noCustomValidityDataAttribute = "noCustomValidity";
async function updateCustomValidity(validityEl, errors) {
  if ("setCustomValidity" in validityEl) {
    validityEl.setCustomValidity("");
  }
  if (noCustomValidityDataAttribute in validityEl.dataset)
    return;
  setCustomValidity(validityEl, errors);
}
function setCustomValidityForm(formElement, errors) {
  for (const el of formElement.querySelectorAll("input,select,textarea,button")) {
    if (noCustomValidityDataAttribute in el.dataset) {
      continue;
    }
    const error = traversePath(errors, splitPath(el.name));
    setCustomValidity(el, error?.value);
    if (error?.value)
      return;
  }
}
function setCustomValidity(el, errors) {
  const message2 = errors && errors.length ? errors.join("\n") : "";
  el.setCustomValidity(message2);
  if (message2)
    el.reportValidity();
}
const isElementInViewport = (el, topOffset = 0) => {
  const rect = el.getBoundingClientRect();
  return rect.top >= topOffset && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && rect.right <= (window.innerWidth || document.documentElement.clientWidth);
};
const scrollToAndCenter = (el, offset = 1.125, behavior = "smooth") => {
  const elementRect = el.getBoundingClientRect();
  const absoluteElementTop = elementRect.top + window.pageYOffset;
  const top = absoluteElementTop - window.innerHeight / (2 * offset);
  window.scrollTo({ left: 0, top, behavior });
};
const immediateInputTypes = ["checkbox", "radio", "range", "file"];
function inputInfo(el) {
  const immediate = !!el && (el instanceof HTMLSelectElement || el instanceof HTMLInputElement && immediateInputTypes.includes(el.type));
  const multiple = !!el && el instanceof HTMLSelectElement && el.multiple;
  const file = !!el && el instanceof HTMLInputElement && el.type == "file";
  return { immediate, multiple, file };
}
var FetchStatus;
(function(FetchStatus2) {
  FetchStatus2[FetchStatus2["Idle"] = 0] = "Idle";
  FetchStatus2[FetchStatus2["Submitting"] = 1] = "Submitting";
  FetchStatus2[FetchStatus2["Delayed"] = 2] = "Delayed";
  FetchStatus2[FetchStatus2["Timeout"] = 3] = "Timeout";
})(FetchStatus || (FetchStatus = {}));
const activeTimers = /* @__PURE__ */ new Set();
function Form$1(formElement, timers, options) {
  let state = FetchStatus.Idle;
  let delayedTimeout, timeoutTimeout;
  const Timers = activeTimers;
  function Timers_start() {
    Timers_clear();
    Timers_setState(state != FetchStatus.Delayed ? FetchStatus.Submitting : FetchStatus.Delayed);
    delayedTimeout = window.setTimeout(() => {
      if (delayedTimeout && state == FetchStatus.Submitting)
        Timers_setState(FetchStatus.Delayed);
    }, options.delayMs);
    timeoutTimeout = window.setTimeout(() => {
      if (timeoutTimeout && state == FetchStatus.Delayed)
        Timers_setState(FetchStatus.Timeout);
    }, options.timeoutMs);
    Timers.add(Timers_clear);
  }
  function Timers_clear() {
    clearTimeout(delayedTimeout);
    clearTimeout(timeoutTimeout);
    delayedTimeout = timeoutTimeout = 0;
    Timers.delete(Timers_clear);
    Timers_setState(FetchStatus.Idle);
  }
  function Timers_clearAll() {
    Timers.forEach((t) => t());
    Timers.clear();
  }
  function Timers_setState(s) {
    state = s;
    timers.submitting.set(state >= FetchStatus.Submitting);
    timers.delayed.set(state >= FetchStatus.Delayed);
    timers.timeout.set(state >= FetchStatus.Timeout);
  }
  const ErrorTextEvents = formElement;
  function ErrorTextEvents__selectText(e) {
    const target = e.target;
    if (options.selectErrorText)
      target.select();
  }
  function ErrorTextEvents_addErrorTextListeners() {
    if (!options.selectErrorText)
      return;
    ErrorTextEvents.querySelectorAll("input").forEach((el) => {
      el.addEventListener("invalid", ErrorTextEvents__selectText);
    });
  }
  function ErrorTextEvents_removeErrorTextListeners() {
    if (!options.selectErrorText)
      return;
    ErrorTextEvents.querySelectorAll("input").forEach((el) => el.removeEventListener("invalid", ErrorTextEvents__selectText));
  }
  const Form2 = formElement;
  function Form_shouldAutoFocus(userAgent) {
    if (typeof options.autoFocusOnError === "boolean")
      return options.autoFocusOnError;
    else
      return !/iPhone|iPad|iPod|Android/i.test(userAgent);
  }
  const Form_scrollToFirstError = async () => {
    if (options.scrollToError == "off")
      return;
    const selector = options.errorSelector;
    if (!selector)
      return;
    await tick();
    let el;
    el = Form2.querySelector(selector);
    if (!el)
      return;
    el = el.querySelector(selector) ?? el;
    const nav = options.stickyNavbar ? document.querySelector(options.stickyNavbar) : null;
    if (typeof options.scrollToError != "string") {
      el.scrollIntoView(options.scrollToError);
    } else if (!isElementInViewport(el, nav?.offsetHeight ?? 0)) {
      scrollToAndCenter(el, void 0, options.scrollToError);
    }
    if (!Form_shouldAutoFocus(navigator.userAgent))
      return;
    let focusEl;
    focusEl = el;
    if (!["INPUT", "SELECT", "BUTTON", "TEXTAREA"].includes(focusEl.tagName)) {
      focusEl = focusEl.querySelector('input:not([type="hidden"]):not(.flatpickr-input), select, textarea');
    }
    if (focusEl) {
      try {
        focusEl.focus({ preventScroll: true });
        if (options.selectErrorText && focusEl.tagName == "INPUT") {
          focusEl.select();
        }
      } catch (err) {
      }
    }
  };
  {
    ErrorTextEvents_addErrorTextListeners();
    const completed = (options2) => {
      if (!options2.clearAll)
        Timers_clear();
      else
        Timers_clearAll();
      if (!options2.cancelled)
        setTimeout(Form_scrollToFirstError, 1);
    };
    onDestroy(() => {
      ErrorTextEvents_removeErrorTextListeners();
      completed({ cancelled: true });
    });
    return {
      submitting() {
        Timers_start();
      },
      completed,
      scrollToFirstError() {
        setTimeout(Form_scrollToFirstError, 1);
      },
      isSubmitting: () => state === FetchStatus.Submitting || state === FetchStatus.Delayed
    };
  }
}
const formIds = /* @__PURE__ */ new WeakMap();
const initialForms = /* @__PURE__ */ new WeakMap();
const defaultOnError = (event) => {
  console.warn("Unhandled Superform error, use onError event to handle it:", event.result.error);
};
const defaultFormOptions = {
  applyAction: true,
  invalidateAll: true,
  resetForm: true,
  autoFocusOnError: "detect",
  scrollToError: "smooth",
  errorSelector: '[aria-invalid="true"],[data-invalid]',
  selectErrorText: false,
  stickyNavbar: void 0,
  taintedMessage: false,
  onSubmit: void 0,
  onResult: void 0,
  onUpdate: void 0,
  onUpdated: void 0,
  onError: defaultOnError,
  dataType: "form",
  validators: void 0,
  customValidity: false,
  clearOnSubmit: "errors-and-message",
  delayMs: 500,
  timeoutMs: 8e3,
  multipleSubmits: "prevent",
  SPA: void 0,
  validationMethod: "auto"
};
let legacyMode = false;
try {
  if (SUPERFORMS_LEGACY)
    legacyMode = true;
} catch {
}
function superForm(form, formOptions) {
  let initialForm;
  let options = formOptions ?? {};
  let initialValidator = void 0;
  {
    if (options.legacy ?? legacyMode) {
      if (options.resetForm === void 0)
        options.resetForm = false;
      if (options.taintedMessage === void 0)
        options.taintedMessage = true;
    }
    initialValidator = options.validators;
    options = {
      ...defaultFormOptions,
      ...options
    };
    if (options.SPA && options.validators === void 0) {
      console.warn("No validators set for superForm in SPA mode. Add a validation adapter to the validators option, or set it to false to disable this warning.");
    }
    if (!form) {
      throw new SuperFormError("No form data sent to superForm. Make sure the output from superValidate is used (usually data.form) and that it's not null or undefined. Alternatively, an object with default values for the form can also be used, but then constraints won't be available.");
    }
    if (!Context_isValidationObject(form)) {
      form = {
        id: options.id ?? "",
        valid: false,
        posted: false,
        errors: {},
        data: form
      };
    }
    form = form;
    const _initialFormId = options.id ?? form.id;
    const _currentPage = get_store_value(page);
    if (!initialForms.has(form)) {
      initialForms.set(form, clone$1(form));
    }
    initialForm = initialForms.get(form);
    if (typeof initialForm.valid !== "boolean") {
      throw new SuperFormError("A non-validation object was passed to superForm. It should be an object of type SuperValidated, usually returned from superValidate.");
    }
    if (_currentPage.form && typeof _currentPage.form === "object") {
      const postedData = _currentPage.form;
      for (const postedForm of Context_findValidationForms(postedData).reverse()) {
        if (postedForm.id == _initialFormId && !initialForms.has(postedForm)) {
          initialForms.set(postedData, postedData);
          const pageDataForm = form;
          form = postedForm;
          form.constraints = pageDataForm.constraints;
          form.shape = pageDataForm.shape;
          if (form.valid && options.resetForm && (options.resetForm === true || options.resetForm())) {
            form = clone$1(pageDataForm);
            form.message = clone$1(postedForm.message);
          }
          break;
        }
      }
    } else {
      form = clone$1(initialForm);
    }
    onDestroy(() => {
      Unsubscriptions_unsubscribe();
      NextChange_clear();
      for (const events of Object.values(formEvents)) {
        events.length = 0;
      }
      formIds.get(_currentPage)?.delete(_initialFormId);
    });
    if (options.dataType !== "json") {
      const checkForNestedData = (key, value) => {
        if (!value || typeof value !== "object")
          return;
        if (Array.isArray(value)) {
          if (value.length > 0)
            checkForNestedData(key, value[0]);
        } else if (!(value instanceof Date) && !(value instanceof File) && !browser) {
          throw new SuperFormError(`Object found in form field "${key}". Set the dataType option to "json" and add use:enhance to use nested data structures. More information: https://superforms.rocks/concepts/nested-data`);
        }
      };
      for (const [key, value] of Object.entries(form.data)) {
        checkForNestedData(key, value);
      }
    }
  }
  const __data = {
    formId: form.id,
    form: clone$1(form.data),
    constraints: form.constraints ?? {},
    posted: form.posted,
    errors: clone$1(form.errors),
    message: clone$1(form.message),
    tainted: void 0,
    valid: form.valid,
    submitting: false,
    shape: form.shape
  };
  const Data = __data;
  const FormId = writable(options.id ?? form.id);
  function Context_findValidationForms(data) {
    const forms = Object.values(data).filter((v) => Context_isValidationObject(v) !== false);
    return forms;
  }
  function Context_isValidationObject(object) {
    if (!object || typeof object !== "object")
      return false;
    if (!("valid" in object && "errors" in object && typeof object.valid === "boolean")) {
      return false;
    }
    return "id" in object && typeof object.id === "string" ? object.id : false;
  }
  const _formData = writable(form.data);
  const Form2 = {
    subscribe: _formData.subscribe,
    set: (value, options2 = {}) => {
      const newData = clone$1(value);
      Tainted_update(newData, options2.taint ?? true);
      return _formData.set(newData);
    },
    update: (updater, options2 = {}) => {
      return _formData.update((value) => {
        const newData = updater(value);
        Tainted_update(newData, options2.taint ?? true);
        return newData;
      });
    }
  };
  async function Form_validate(opts = {
    recheckValidData: true
  }) {
    const dataToValidate = opts.formData ?? Data.form;
    let errors = {};
    let status = { success: true, data: dataToValidate };
    const validator = opts.adapter ?? options.validators;
    if (typeof validator == "object") {
      if (validator != initialValidator && !("jsonSchema" in validator)) {
        throw new SuperFormError("Client validation adapter found in options.validators. A full adapter must be used when changing validators dynamically.");
      }
      status = await /* @__PURE__ */ validator.validate(dataToValidate);
      if (!status.success) {
        errors = mapErrors(status.issues, validator.shape ?? Data.shape ?? {});
      } else if (opts.recheckValidData) {
        return Form_validate({ ...opts, recheckValidData: false });
      }
    }
    const data = status.success ? { ...dataToValidate, ...status.data } : dataToValidate;
    return {
      valid: status.success,
      posted: false,
      errors,
      data,
      constraints: Data.constraints,
      message: void 0,
      id: Data.formId,
      shape: Data.shape
    };
  }
  function Form__changeEvent(event) {
    if (!options.onChange || !event.paths.length || event.type == "blur")
      return;
    let changeEvent;
    const paths = event.paths.map(mergePath);
    if (event.type && event.paths.length == 1 && event.formElement && event.target instanceof Element) {
      changeEvent = {
        path: paths[0],
        paths,
        formElement: event.formElement,
        target: event.target
      };
    } else {
      changeEvent = {
        paths,
        target: void 0
      };
    }
    options.onChange(changeEvent);
  }
  async function Form_clientValidation(event, force = false, adapter) {
    if (event) {
      if (options.validators == "clear") {
        Errors.update(($errors) => {
          setPaths($errors, event.paths, void 0);
          return $errors;
        });
      }
      setTimeout(() => Form__changeEvent(event));
    }
    if (!event || !options.validators || options.validators == "clear")
      return;
    if (!force) {
      if (options.validationMethod == "onsubmit" || options.validationMethod == "submit-only") {
        return;
      }
      if (options.validationMethod == "onblur" && event.type == "input")
        return;
      if (options.validationMethod == "oninput" && event.type == "blur")
        return;
    }
    const result = await Form_validate({ adapter });
    if (result.valid && (event.immediate || event.type != "input")) {
      Form2.set(result.data, { taint: "ignore" });
    }
    await tick();
    Form__displayNewErrors(result.errors, event, force);
    return result;
  }
  async function Form__displayNewErrors(errors, event, force) {
    const { type, immediate, multiple, paths } = event;
    const previous = Data.errors;
    const output = {};
    const validity = /* @__PURE__ */ new Map();
    const formElement = event.formElement ?? EnhancedForm;
    if (options.customValidity && formElement) {
      for (const path of event.paths) {
        const name2 = CSS.escape(mergePath(path));
        const el = formElement.querySelector(`[name="${name2}"]`);
        if (el) {
          const message2 = "validationMessage" in el ? String(el.validationMessage) : "";
          validity.set(path.join(), { el, message: message2 });
          updateCustomValidity(el, void 0);
        }
      }
    }
    traversePaths(errors, (error) => {
      if (!Array.isArray(error.value))
        return;
      let joinedPath = error.path.join(".");
      if (joinedPath.endsWith("._errors")) {
        joinedPath = joinedPath.substring(0, -8);
      }
      function addError() {
        setPaths(output, [error.path], error.value);
        if (options.customValidity && isEventError && validity.has(joinedPath)) {
          const { el, message: message2 } = validity.get(joinedPath);
          if (message2 != error.value) {
            updateCustomValidity(el, error.value);
            validity.clear();
          }
        }
      }
      if (force)
        return addError();
      const isEventError = error.value && paths.map((path) => path.join(".")).some((path) => path.startsWith(joinedPath));
      if (isEventError && options.validationMethod == "oninput")
        return addError();
      if (immediate && !multiple && isEventError)
        return addError();
      if (multiple) {
        const errorPath = pathExists(get_store_value(Errors), error.path.slice(0, -1));
        if (errorPath?.value && typeof errorPath?.value == "object") {
          for (const errors2 of Object.values(errorPath.value)) {
            if (Array.isArray(errors2)) {
              return addError();
            }
          }
        }
      }
      const previousError = pathExists(previous, error.path);
      if (previousError && previousError.key in previousError.parent) {
        return addError();
      }
      const lastPath = error.path[error.path.length - 1];
      const isObjectError = lastPath == "_errors";
      if (isObjectError) {
        if (options.validationMethod == "oninput" || type == "blur" && Tainted_hasBeenTainted(mergePath(error.path.slice(0, -1)))) {
          return addError();
        }
      } else {
        if (type == "blur" && isEventError) {
          return addError();
        }
      }
    });
    Errors.set(output);
  }
  function Form_set(data, options2 = {}) {
    if (options2.keepFiles) {
      traversePaths(Data.form, (info) => {
        if (info.value instanceof File || browser) {
          const dataPath = pathExists(data, info.path);
          if (!dataPath || !(dataPath.key in dataPath.parent)) {
            setPaths(data, [info.path], info.value);
          }
        }
      });
    }
    return Form2.set(data, options2);
  }
  function Form_shouldReset(validForm, successActionResult) {
    return validForm && successActionResult && options.resetForm && (options.resetForm === true || options.resetForm());
  }
  async function Form_updateFromValidation(form2, successResult) {
    if (form2.valid && successResult && Form_shouldReset(form2.valid, successResult)) {
      Form_reset(form2.message);
    } else {
      rebind(form2, successResult, void 0, true);
    }
    if (formEvents.onUpdated.length) {
      await tick();
    }
    for (const event of formEvents.onUpdated) {
      event({ form: form2 });
    }
  }
  function Form_reset(message2, data, id) {
    const resetData = clone$1(initialForm);
    resetData.data = { ...resetData.data, ...data };
    if (id !== void 0)
      resetData.id = id;
    rebind(resetData, true, message2, false);
  }
  const Form_updateFromActionResult = async (result) => {
    if (result.type == "error") {
      throw new SuperFormError(`ActionResult of type "${result.type}" cannot be passed to update function.`);
    }
    if (result.type == "redirect") {
      if (Form_shouldReset(true, true))
        Form_reset();
      return;
    }
    if (typeof result.data !== "object") {
      throw new SuperFormError("Non-object validation data returned from ActionResult.");
    }
    const forms = Context_findValidationForms(result.data);
    if (!forms.length) {
      throw new SuperFormError("No form data returned from ActionResult. Make sure you return { form } in the form actions.");
    }
    for (const newForm of forms) {
      if (newForm.id !== Data.formId)
        continue;
      await Form_updateFromValidation(newForm, result.status >= 200 && result.status < 300);
    }
  };
  const Message = writable(__data.message);
  const Constraints = writable(__data.constraints);
  const Posted = writable(__data.posted);
  const Shape = writable(__data.shape);
  const _errors = writable(form.errors);
  const Errors = {
    subscribe: _errors.subscribe,
    set(value, options2) {
      return _errors.set(updateErrors(value, Data.errors, options2?.force));
    },
    update(updater, options2) {
      return _errors.update((value) => {
        return updateErrors(updater(value), Data.errors, options2?.force);
      });
    },
    /**
     * To work with client-side validation, errors cannot be deleted but must
     * be set to undefined, to know where they existed before (tainted+error check in oninput)
     */
    clear: () => void 0
  };
  let NextChange = null;
  function NextChange_setHtmlEvent(event) {
    NextChange = event;
    setTimeout(() => {
      Form_clientValidation(NextChange);
    }, 0);
  }
  function NextChange_additionalEventInformation(event, immediate, multiple, formElement, target) {
    if (NextChange === null) {
      NextChange = { paths: [] };
    }
    NextChange.type = event;
    NextChange.immediate = immediate;
    NextChange.multiple = multiple;
    NextChange.formElement = formElement;
    NextChange.target = target;
  }
  function NextChange_paths() {
    return NextChange?.paths ?? [];
  }
  function NextChange_clear() {
    NextChange = null;
  }
  const Tainted = {
    state: writable(),
    message: options.taintedMessage,
    clean: clone$1(form.data)
    // Important to clone form.data, so it's not comparing the same object,
  };
  function Tainted_enable() {
    options.taintedMessage = Tainted.message;
  }
  function Tainted_currentState() {
    return Tainted.state;
  }
  function Tainted_hasBeenTainted(path) {
    if (!Data.tainted)
      return false;
    if (!path)
      return !!Data.tainted;
    const field = pathExists(Data.tainted, splitPath(path));
    return !!field && field.key in field.parent;
  }
  function Tainted_isTainted(path) {
    if (typeof path === "boolean")
      return path;
    if (typeof path === "object")
      return Tainted__isObjectTainted(path);
    if (!Data.tainted)
      return false;
    if (!path)
      return Tainted__isObjectTainted(Data.tainted);
    const field = pathExists(Data.tainted, splitPath(path));
    return Tainted__isObjectTainted(field?.value);
  }
  function Tainted__isObjectTainted(obj) {
    if (!obj)
      return false;
    if (typeof obj === "object") {
      for (const obj2 of Object.values(obj)) {
        if (Tainted__isObjectTainted(obj2))
          return true;
      }
    }
    return obj === true;
  }
  function Tainted_update(newData, taintOptions) {
    if (taintOptions == "ignore")
      return;
    const paths = comparePaths(newData, Data.form);
    if (paths.length) {
      if (taintOptions == "untaint-all" || taintOptions == "untaint-form") {
        Tainted.state.set(void 0);
      } else {
        Tainted.state.update((tainted) => {
          if (!tainted)
            tainted = {};
          setPaths(tainted, paths, (path, data) => {
            const currentValue = traversePath(newData, path);
            const cleanPath = traversePath(Tainted.clean, path);
            return currentValue && cleanPath && currentValue.value === cleanPath.value ? void 0 : taintOptions === true ? true : taintOptions === "untaint" ? void 0 : data.value;
          });
          return tainted;
        });
      }
    }
    NextChange_setHtmlEvent({ paths });
  }
  function Tainted_set(tainted, newClean) {
    Tainted.state.set(tainted);
    if (newClean)
      Tainted.clean = newClean;
  }
  const Submitting = writable(false);
  const Delayed = writable(false);
  const Timeout = writable(false);
  const Unsubscriptions = [
    // eslint-disable-next-line dci-lint/private-role-access
    Tainted.state.subscribe((tainted) => __data.tainted = clone$1(tainted)),
    // eslint-disable-next-line dci-lint/private-role-access
    Form2.subscribe((form2) => __data.form = clone$1(form2)),
    // eslint-disable-next-line dci-lint/private-role-access
    Errors.subscribe((errors) => __data.errors = clone$1(errors)),
    FormId.subscribe((id) => __data.formId = id),
    Constraints.subscribe((constraints) => __data.constraints = constraints),
    Posted.subscribe((posted) => __data.posted = posted),
    Message.subscribe((message2) => __data.message = message2),
    Submitting.subscribe((submitting) => __data.submitting = submitting),
    Shape.subscribe((shape) => __data.shape = shape)
  ];
  function Unsubscriptions_unsubscribe() {
    Unsubscriptions.forEach((unsub) => unsub());
  }
  const AllErrors = derived(Errors, ($errors) => $errors ? flattenErrors($errors) : []);
  let EnhancedForm;
  options.taintedMessage = void 0;
  function rebind(form2, untaint, message2, keepFiles) {
    if (untaint) {
      Tainted_set(typeof untaint === "boolean" ? void 0 : untaint, form2.data);
    }
    message2 = message2 ?? form2.message;
    Form_set(form2.data, { taint: "ignore", keepFiles });
    Message.set(message2);
    Errors.set(form2.errors);
    FormId.set(form2.id);
    Posted.set(form2.posted);
    if (form2.constraints)
      Constraints.set(form2.constraints);
    if (form2.shape)
      Shape.set(form2.shape);
    __data.valid = form2.valid;
    if (options.flashMessage && shouldSyncFlash(options)) {
      const flash = options.flashMessage.module.getFlash(page);
      if (message2 && get_store_value(flash) === void 0) {
        flash.set(message2);
      }
    }
  }
  const formEvents = {
    onSubmit: options.onSubmit ? [options.onSubmit] : [],
    onResult: options.onResult ? [options.onResult] : [],
    onUpdate: options.onUpdate ? [options.onUpdate] : [],
    onUpdated: options.onUpdated ? [options.onUpdated] : [],
    onError: options.onError ? [options.onError] : []
  };
  return {
    form: Form2,
    formId: FormId,
    errors: Errors,
    message: Message,
    constraints: Constraints,
    tainted: Tainted_currentState(),
    submitting: readonly(Submitting),
    delayed: readonly(Delayed),
    timeout: readonly(Timeout),
    options,
    capture() {
      return {
        valid: Data.valid,
        posted: Data.posted,
        errors: Data.errors,
        data: Data.form,
        constraints: Data.constraints,
        message: Data.message,
        id: Data.formId,
        tainted: Data.tainted,
        shape: Data.shape
      };
    },
    restore: (snapshot) => {
      rebind(snapshot, snapshot.tainted ?? true);
    },
    async validate(path, opts = {}) {
      if (!options.validators) {
        throw new SuperFormError("options.validators must be set to use the validate method.");
      }
      if (opts.update === void 0)
        opts.update = true;
      if (opts.taint === void 0)
        opts.taint = false;
      if (typeof opts.errors == "string")
        opts.errors = [opts.errors];
      let data;
      const splittedPath = splitPath(path);
      if ("value" in opts) {
        if (opts.update === true || opts.update === "value") {
          Form2.update(($form) => {
            setPaths($form, [splittedPath], opts.value);
            return $form;
          }, { taint: opts.taint });
          data = Data.form;
        } else {
          data = clone$1(Data.form);
          setPaths(data, [splittedPath], opts.value);
        }
      } else {
        data = Data.form;
      }
      const result = await Form_validate({ formData: data });
      const error = pathExists(result.errors, splittedPath);
      if (error && error.value && opts.errors) {
        error.value = opts.errors;
      }
      if (opts.update === true || opts.update == "errors") {
        Errors.update(($errors) => {
          setPaths($errors, [splittedPath], error?.value);
          return $errors;
        });
      }
      return error?.value;
    },
    async validateForm(opts = {}) {
      if (!options.validators && !opts.schema) {
        throw new SuperFormError("options.validators or the schema option must be set to use the validateForm method.");
      }
      const result = opts.update ? await Form_clientValidation({ paths: [] }, true, opts.schema) : Form_validate({ adapter: opts.schema });
      return result || Form_validate({ adapter: opts.schema });
    },
    allErrors: AllErrors,
    posted: Posted,
    reset(options2) {
      return Form_reset(options2?.keepMessage ? Data.message : void 0, options2?.data, options2?.id);
    },
    isTainted: Tainted_isTainted,
    ///// Custom use:enhance ////////////////////////////////////////
    // @DCI-context
    enhance(FormElement, events) {
      EnhancedForm = FormElement;
      if (events) {
        if (events.onError) {
          if (options.onError === "apply") {
            throw new SuperFormError('options.onError is set to "apply", cannot add any onError events.');
          } else if (events.onError === "apply") {
            throw new SuperFormError('Cannot add "apply" as onError event in use:enhance.');
          }
          formEvents.onError.push(events.onError);
        }
        if (events.onResult)
          formEvents.onResult.push(events.onResult);
        if (events.onSubmit)
          formEvents.onSubmit.push(events.onSubmit);
        if (events.onUpdate)
          formEvents.onUpdate.push(events.onUpdate);
        if (events.onUpdated)
          formEvents.onUpdated.push(events.onUpdated);
      }
      Tainted_enable();
      let lastInputChange;
      async function onInput(e) {
        const info = inputInfo(e.target);
        if (info.immediate && !info.file)
          await new Promise((r) => setTimeout(r, 0));
        lastInputChange = NextChange_paths();
        NextChange_additionalEventInformation("input", info.immediate, info.multiple, FormElement, e.target ?? void 0);
      }
      async function onBlur(e) {
        if (Data.submitting)
          return;
        if (!lastInputChange || NextChange_paths() != lastInputChange) {
          return;
        }
        const info = inputInfo(e.target);
        if (info.immediate && !info.file)
          await new Promise((r) => setTimeout(r, 0));
        Form_clientValidation({
          paths: lastInputChange,
          immediate: info.multiple,
          multiple: info.multiple,
          type: "blur",
          formElement: FormElement,
          target: e.target ?? void 0
        });
        lastInputChange = void 0;
      }
      FormElement.addEventListener("focusout", onBlur);
      FormElement.addEventListener("input", onInput);
      onDestroy(() => {
        FormElement.removeEventListener("focusout", onBlur);
        FormElement.removeEventListener("input", onInput);
        EnhancedForm = void 0;
      });
      const htmlForm = Form$1(FormElement, { submitting: Submitting, delayed: Delayed, timeout: Timeout }, options);
      let currentRequest;
      return enhance(FormElement, async (submit2) => {
        const _submitCancel = submit2.cancel;
        let cancelled = false;
        function cancel(resetTimers = true) {
          cancelled = true;
          if (resetTimers && htmlForm.isSubmitting()) {
            htmlForm.completed({ cancelled });
          }
          return _submitCancel();
        }
        submit2.cancel = cancel;
        if (htmlForm.isSubmitting() && options.multipleSubmits == "prevent") {
          cancel(false);
        } else {
          if (htmlForm.isSubmitting() && options.multipleSubmits == "abort") {
            if (currentRequest)
              currentRequest.abort();
          }
          htmlForm.submitting();
          currentRequest = submit2.controller;
          for (const event of formEvents.onSubmit) {
            await event(submit2);
          }
        }
        if (cancelled) {
          if (options.flashMessage)
            cancelFlash(options);
        } else {
          const noValidate = !options.SPA && (FormElement.noValidate || (submit2.submitter instanceof HTMLButtonElement || submit2.submitter instanceof HTMLInputElement) && submit2.submitter.formNoValidate);
          let validation = void 0;
          if (!noValidate) {
            validation = await Form_validate();
            if (!validation.valid) {
              cancel(false);
              const result = {
                type: "failure",
                status: (typeof options.SPA === "boolean" ? void 0 : options.SPA?.failStatus) ?? 400,
                data: { form: validation }
              };
              setTimeout(() => validationResponse({ result }), 0);
            }
          }
          if (!cancelled) {
            switch (options.clearOnSubmit) {
              case "errors-and-message":
                Errors.clear();
                Message.set(void 0);
                break;
              case "errors":
                Errors.clear();
                break;
              case "message":
                Message.set(void 0);
                break;
            }
            if (options.flashMessage && (options.clearOnSubmit == "errors-and-message" || options.clearOnSubmit == "message") && shouldSyncFlash(options)) {
              options.flashMessage.module.getFlash(page).set(void 0);
            }
            const submitData = "formData" in submit2 ? submit2.formData : submit2.data;
            lastInputChange = void 0;
            if (options.SPA) {
              cancel(false);
              if (!validation)
                validation = await Form_validate();
              const validationResult = { ...validation, posted: true };
              const result = {
                type: validationResult.valid ? "success" : "failure",
                status: validationResult.valid ? 200 : typeof options.SPA == "object" ? options.SPA?.failStatus : 400,
                data: { form: validationResult }
              };
              setTimeout(() => validationResponse({ result }), 0);
            } else if (options.dataType === "json") {
              if (!validation)
                validation = await Form_validate();
              const postData = clone$1(validation.data);
              traversePaths(postData, (data) => {
                if (data.value instanceof File) {
                  const key = "__superform_file_" + mergePath(data.path);
                  submitData.append(key, data.value);
                  return data.set(void 0);
                } else if (Array.isArray(data.value) && data.value.every((v) => v instanceof File)) {
                  const key = "__superform_files_" + mergePath(data.path);
                  for (const file of data.value) {
                    submitData.append(key, file);
                  }
                  return data.set(void 0);
                }
              });
              Object.keys(postData).forEach((key) => {
                if (typeof submitData.get(key) === "string") {
                  submitData.delete(key);
                }
              });
              const chunks = chunkSubstr(stringify(postData), options.jsonChunkSize ?? 5e5);
              for (const chunk of chunks) {
                submitData.append("__superform_json", chunk);
              }
            }
            if (!options.SPA && !submitData.has("__superform_id")) {
              const id = Data.formId;
              if (id !== void 0)
                submitData.set("__superform_id", id);
            }
          }
        }
        function chunkSubstr(str, size) {
          const numChunks = Math.ceil(str.length / size);
          const chunks = new Array(numChunks);
          for (let i = 0, o = 0; i < numChunks; ++i, o += size) {
            chunks[i] = str.substring(o, o + size);
          }
          return chunks;
        }
        async function validationResponse(event) {
          const result = event.result.type ? event.result : {
            type: "error",
            status: 500,
            error: event.result
          };
          currentRequest = null;
          let cancelled2 = false;
          const data = {
            result,
            formEl: FormElement,
            formElement: FormElement,
            cancel: () => cancelled2 = true
          };
          for (const event2 of formEvents.onResult) {
            await event2(data);
          }
          if (!cancelled2) {
            if ((result.type === "success" || result.type == "failure") && result.data) {
              const forms = Context_findValidationForms(result.data);
              if (!forms.length) {
                throw new SuperFormError("No form data returned from ActionResult. Make sure you return { form } in the form actions.");
              }
              for (const newForm of forms) {
                if (newForm.id !== Data.formId)
                  continue;
                const data2 = {
                  form: newForm,
                  formEl: FormElement,
                  formElement: FormElement,
                  cancel: () => cancelled2 = true
                };
                for (const event2 of formEvents.onUpdate) {
                  await event2(data2);
                }
                if (!cancelled2) {
                  if (options.customValidity) {
                    setCustomValidityForm(FormElement, data2.form.errors);
                  }
                  if (Form_shouldReset(data2.form.valid, result.type == "success")) {
                    data2.formElement.querySelectorAll('input[type="file"]').forEach((e) => e.value = "");
                  }
                }
              }
            }
            if (!cancelled2) {
              if (result.type !== "error") {
                if (result.type === "success" && options.invalidateAll) {
                  await invalidateAll();
                }
                if (options.applyAction) {
                  await applyAction();
                } else {
                  await Form_updateFromActionResult(result);
                }
              } else {
                if (options.applyAction) {
                  if (options.onError == "apply") {
                    await applyAction();
                  } else {
                    ({
                      type: "failure",
                      status: Math.floor(result.status || 500),
                      data: result
                    });
                    await applyAction();
                  }
                }
                if (options.onError !== "apply") {
                  const data2 = { result, message: Message };
                  for (const onErrorEvent of formEvents.onError) {
                    if (onErrorEvent !== "apply" && (onErrorEvent != defaultOnError || !options.flashMessage?.onError)) {
                      await onErrorEvent(data2);
                    }
                  }
                }
              }
              if (options.flashMessage) {
                if (result.type == "error" && options.flashMessage.onError) {
                  await options.flashMessage.onError({
                    result,
                    flashMessage: options.flashMessage.module.getFlash(page)
                  });
                }
              }
            }
          }
          if (cancelled2 && options.flashMessage) {
            cancelFlash(options);
          }
          if (cancelled2 || result.type != "redirect") {
            htmlForm.completed({ cancelled: cancelled2 });
          } else {
            const unsub = navigating.subscribe(($nav) => {
              if ($nav)
                return;
              setTimeout(() => {
                try {
                  if (unsub)
                    unsub();
                } catch {
                }
              });
              if (htmlForm.isSubmitting()) {
                htmlForm.completed({ cancelled: cancelled2, clearAll: true });
              }
            });
          }
        }
        return validationResponse;
      });
    }
  };
}
function formFieldProxy(superForm2, path, options) {
  const path2 = splitPath(path);
  const constraintsPath = path2.filter((p) => /\D/.test(String(p))).join(".");
  const taintedProxy = derived(superForm2.tainted, ($tainted) => {
    if (!$tainted)
      return $tainted;
    const taintedPath = traversePath($tainted, path2);
    return taintedPath ? taintedPath.value : void 0;
  });
  const tainted = {
    subscribe: taintedProxy.subscribe,
    update(upd) {
      superForm2.tainted.update(($tainted) => {
        if (!$tainted)
          $tainted = {};
        const output = traversePath($tainted, path2, (path3) => {
          if (!path3.value)
            path3.parent[path3.key] = {};
          return path3.parent[path3.key];
        });
        if (output)
          output.parent[output.key] = upd(output.value);
        return $tainted;
      });
    },
    set(value) {
      superForm2.tainted.update(($tainted) => {
        if (!$tainted)
          $tainted = {};
        const output = traversePath($tainted, path2, (path3) => {
          if (!path3.value)
            path3.parent[path3.key] = {};
          return path3.parent[path3.key];
        });
        if (output)
          output.parent[output.key] = value;
        return $tainted;
      });
    }
  };
  return {
    path,
    value: superFieldProxy(superForm2, path, options),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    errors: fieldProxy(superForm2.errors, path),
    constraints: fieldProxy(superForm2.constraints, constraintsPath),
    tainted
  };
}
function updateProxyField(obj, path, updater) {
  const output = traversePath(obj, path, ({ parent, key, value }) => {
    if (value === void 0)
      parent[key] = /\D/.test(key) ? {} : [];
    return parent[key];
  });
  if (output) {
    const newValue = updater(output.value);
    output.parent[output.key] = newValue;
  }
  return obj;
}
function superFieldProxy(superForm2, path, baseOptions) {
  const form = superForm2.form;
  const path2 = splitPath(path);
  const proxy = derived(form, ($form) => {
    const data = traversePath($form, path2);
    return data?.value;
  });
  return {
    subscribe(...params) {
      const unsub = proxy.subscribe(...params);
      return () => unsub();
    },
    update(upd, options) {
      form.update((data) => updateProxyField(data, path2, upd), options ?? baseOptions);
    },
    set(value, options) {
      form.update((data) => updateProxyField(data, path2, () => value), options ?? baseOptions);
    }
  };
}
function isSuperForm(form, options) {
  const isSuperForm2 = "form" in form;
  if (!isSuperForm2 && options?.taint !== void 0) {
    throw new SuperFormError("If options.taint is set, the whole superForm object must be used as a proxy.");
  }
  return isSuperForm2;
}
function fieldProxy(form, path, options) {
  const path2 = splitPath(path);
  if (isSuperForm(form, options)) {
    return superFieldProxy(form, path, options);
  }
  const proxy = derived(form, ($form) => {
    const data = traversePath($form, path2);
    return data?.value;
  });
  return {
    subscribe(...params) {
      const unsub = proxy.subscribe(...params);
      return () => unsub();
    },
    update(upd) {
      form.update((data) => updateProxyField(data, path2, upd));
    },
    set(value) {
      form.update((data) => updateProxyField(data, path2, () => value));
    }
  };
}
const FORM_FIELD_CONTEXT = "FormField";
function createFormField(name2, attrStore, value, errors, ids) {
  const hasValidation = writable(false);
  const hasDescription = writable(false);
  const actions = createFieldActions({
    ids,
    attrs: attrStore,
    hasValidation,
    hasDescription,
    value,
    name: name2
  });
  const setValue = (v) => {
    value.set(v);
  };
  const handlers = createFieldHandlers(setValue);
  const context = {
    ids,
    name: name2,
    errors,
    value,
    hasValidation,
    hasDescription,
    attrStore,
    actions,
    setValue,
    handlers
  };
  setContext(FORM_FIELD_CONTEXT, context);
  function getFieldAttrs(props) {
    const { val, errors: errors2, constraints, hasValidation: hasValidation2, hasDescription: hasDescription2 } = props;
    const $ids = get_store_value(ids);
    const describedBy = errors2 ? `${hasValidation2 ? $ids.validation : ""} ${hasDescription2 ? $ids.description : ""}` : hasDescription2 ? $ids.description : void 0;
    const attrs = {
      "aria-invalid": errors2 ? true : void 0,
      "aria-describedby": describedBy,
      "aria-required": !!constraints?.required,
      "data-invalid": errors2 ? true : void 0,
      "data-valid": errors2 ? void 0 : true,
      name: name2,
      id: $ids.input,
      value: val
    };
    attrStore.set(attrs);
    return attrs;
  }
  return {
    getFieldAttrs,
    actions,
    attrStore,
    hasDescription,
    hasValidation,
    handlers,
    setValue,
    context
  };
}
function createFieldActions(props) {
  const { ids, attrs, hasValidation, hasDescription, value, name: name2 } = props;
  const controlAttrs = {
    ids,
    value,
    name: name2,
    attrs
  };
  return {
    label: createLabelAction({
      ids
    }),
    description: createDescriptionAction({ ids, hasDescription }),
    validation: createValidationAction({
      ids,
      hasValidation,
      attrs: {
        "aria-live": "assertive"
      }
    }),
    input: createInputAction({ ...controlAttrs }),
    textarea: createTextareaAction({ ...controlAttrs }),
    radio: createRadioAction({ ...controlAttrs }),
    select: createSelectAction({ ...controlAttrs }),
    checkbox: createCheckboxAction({ ...controlAttrs })
  };
}
function createLabelAction(props) {
  const { ids } = props;
  return (node) => {
    node.htmlFor = get_store_value(ids).input;
    const handleMouseDown = (e) => {
      e.preventDefault();
    };
    const unsubEffect = effect(ids, ($ids) => {
      node.htmlFor = $ids.input;
    });
    const unsubEvent = addEventListener(node, "mousedown", handleMouseDown);
    return {
      destroy() {
        unsubEvent();
        unsubEffect();
      }
    };
  };
}
function createValidationAction(props) {
  const { ids, hasValidation, attrs } = props;
  return (node) => {
    node.id = get_store_value(ids).validation;
    setAttributes(node, attrs);
    hasValidation.set(true);
    const unsubEffect = effect(ids, ($ids) => {
      node.id = $ids.validation;
    });
    return {
      destroy() {
        hasValidation.set(false);
        unsubEffect();
      }
    };
  };
}
function createDescriptionAction(props) {
  const { ids, hasDescription } = props;
  return (node) => {
    node.id = get_store_value(ids).description;
    hasDescription.set(true);
    const unsubEffect = effect(ids, ($ids) => {
      node.id = $ids.description;
    });
    return {
      destroy() {
        hasDescription.set(false);
        unsubEffect();
      }
    };
  };
}
function createInputAction(props) {
  const { ids, value, name: name2, attrs } = props;
  return (node) => {
    node.id = get_store_value(ids).input;
    node.value = get_store_value(value) ?? "";
    node.name = name2;
    const unsubAttrs = effect(attrs, ($attrs) => {
      setAttributes(node, $attrs);
    });
    const unsubEffect = effect(ids, ($ids) => {
      node.id = $ids.input;
    });
    const handleInput = () => {
      value.set(node.value);
    };
    const unsubEvent = addEventListener(node, "input", handleInput);
    return {
      destroy() {
        unsubEvent();
        unsubAttrs();
        unsubEffect();
      }
    };
  };
}
function createTextareaAction(props) {
  const { ids, value, name: name2, attrs } = props;
  return (node) => {
    node.id = get_store_value(ids).input;
    node.value = get_store_value(value) ?? "";
    node.name = name2;
    const unsubAttrs = effect(attrs, ($attrs) => {
      setAttributes(node, $attrs);
    });
    const unsubEffect = effect(ids, ($ids) => {
      node.id = $ids.input;
    });
    const handleInput = () => {
      value.set(node.value);
    };
    const unsubEvent = addEventListener(node, "input", handleInput);
    return {
      destroy() {
        unsubEvent();
        unsubAttrs();
        unsubEffect();
      }
    };
  };
}
function createCheckboxAction(props) {
  const { ids, value, name: name2, attrs } = props;
  return (node) => {
    node.id = get_store_value(ids).input;
    node.checked = get_store_value(value) ?? false;
    node.name = name2;
    const handleChange = () => {
      value.set(node.checked);
    };
    const unsubAttrs = effect(attrs, ($attrs) => {
      setAttributes(node, $attrs);
    });
    const unsubEffect = effect(ids, ($ids) => {
      node.id = $ids.validation;
    });
    const unsubEvent = addEventListener(node, "change", handleChange);
    return {
      destroy() {
        unsubEvent();
        unsubAttrs();
        unsubEffect();
      }
    };
  };
}
function createRadioAction(props) {
  const { ids, value, name: name2, attrs } = props;
  return (node) => {
    node.id = get_store_value(ids).input;
    node.name = name2;
    const $value = get_store_value(value);
    if (node.value === $value) {
      node.checked = true;
    } else {
      node.checked = false;
    }
    const unsubAttrs = effect(attrs, ($attrs) => {
      delete $attrs.value;
      setAttributes(node, $attrs);
    });
    const unsubEffect = effect(ids, ($ids) => {
      node.id = $ids.input;
    });
    const handleChange = () => {
      if (node.checked) {
        value.set(node.value);
      }
    };
    const unsubEvent = addEventListener(node, "change", handleChange);
    return {
      destroy() {
        unsubEvent();
        unsubAttrs();
        unsubEffect();
      }
    };
  };
}
function createSelectAction(props) {
  const { ids, value, name: name2, attrs } = props;
  return (node) => {
    node.id = get_store_value(ids).input;
    node.value = get_store_value(value) ?? "";
    node.name = name2;
    const handleChange = () => {
      value.set(node.value);
    };
    const unsubEffect = effect(ids, ($ids) => {
      node.id = $ids.input;
    });
    const unsubAttrs = effect(attrs, ($attrs) => {
      setAttributes(node, $attrs);
    });
    const unsubEvent = addEventListener(node, "change", handleChange);
    return {
      destroy() {
        unsubEvent();
        unsubAttrs();
        unsubEffect();
      }
    };
  };
}
function addEventListener(target, event, handler, options) {
  const events = Array.isArray(event) ? event : [event];
  events.forEach((_event) => target.addEventListener(_event, handler, options));
  return () => {
    events.forEach((_event) => target.removeEventListener(_event, handler, options));
  };
}
function isHTMLInputElement(element) {
  return element instanceof HTMLInputElement;
}
function isHTMLSelectElement(element) {
  return element instanceof HTMLSelectElement;
}
function isHTMLTextareaElement(element) {
  return element instanceof HTMLTextAreaElement;
}
function derivedWithUnsubscribe(stores, fn) {
  let unsubscribers = [];
  const onUnsubscribe = (cb) => {
    unsubscribers.push(cb);
  };
  const unsubscribe = () => {
    unsubscribers.forEach((fn2) => fn2());
    unsubscribers = [];
  };
  const derivedStore = derived(stores, ($storeValues) => {
    unsubscribe();
    return fn($storeValues, onUnsubscribe);
  });
  onDestroy(unsubscribe);
  const subscribe2 = (...args) => {
    const unsub = derivedStore.subscribe(...args);
    return () => {
      unsub();
      unsubscribe();
    };
  };
  return {
    ...derivedStore,
    subscribe: subscribe2
  };
}
function effect(stores, fn) {
  const unsub = derivedWithUnsubscribe(stores, (stores2, onUnsubscribe) => {
    return {
      stores: stores2,
      onUnsubscribe
    };
  }).subscribe(({ stores: stores2, onUnsubscribe }) => {
    const returned = fn(stores2);
    if (returned) {
      onUnsubscribe(returned);
    }
  });
  onDestroy(unsub);
  return unsub;
}
function createFieldHandlers(setValue) {
  return {
    input: (e) => {
      const target = e.target;
      if (!isHTMLInputElement(target) && !isHTMLTextareaElement(target))
        return;
      setValue(target.value);
    },
    checkbox: (e) => {
      const target = e.target;
      if (!isHTMLInputElement(target))
        return;
      setValue(target.checked);
    },
    radio: (e) => {
      const target = e.target;
      if (!isHTMLInputElement(target))
        return;
      if (target.checked)
        setValue(target.value);
    },
    select: (e) => {
      const target = e.target;
      if (!isHTMLSelectElement(target))
        return;
      setValue(target.value);
    }
  };
}
function createIds(controlId) {
  const input = Math.random().toString(36).slice(3);
  const description = `${input}-description`;
  const validation = `${input}-validation`;
  return {
    input: controlId ? controlId : input,
    description,
    validation
  };
}
const FORM_CONTEXT = "Form";
function setAttributes(node, attrs) {
  for (const [key, value] of Object.entries(attrs)) {
    if (typeof value === "string") {
      node.setAttribute(key, value);
    }
  }
}
const Form_field = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let errors;
  let value;
  let constraints;
  let getFieldAttrs;
  let actions;
  let hasValidation;
  let hasDescription;
  let handlers;
  let setValue;
  let inputAttrs;
  let attrs;
  let $ids, $$unsubscribe_ids;
  let $hasDescription, $$unsubscribe_hasDescription = noop, $$subscribe_hasDescription = () => ($$unsubscribe_hasDescription(), $$unsubscribe_hasDescription = subscribe(hasDescription, ($$value) => $hasDescription = $$value), hasDescription);
  let $hasValidation, $$unsubscribe_hasValidation = noop, $$subscribe_hasValidation = () => ($$unsubscribe_hasValidation(), $$unsubscribe_hasValidation = subscribe(hasValidation, ($$value) => $hasValidation = $$value), hasValidation);
  let $constraints, $$unsubscribe_constraints = noop, $$subscribe_constraints = () => ($$unsubscribe_constraints(), $$unsubscribe_constraints = subscribe(constraints, ($$value) => $constraints = $$value), constraints);
  let $errors, $$unsubscribe_errors = noop, $$subscribe_errors = () => ($$unsubscribe_errors(), $$unsubscribe_errors = subscribe(errors, ($$value) => $errors = $$value), errors);
  let $value, $$unsubscribe_value = noop, $$subscribe_value = () => ($$unsubscribe_value(), $$unsubscribe_value = subscribe(value, ($$value) => $value = $$value), value);
  let { config } = $$props;
  let { name: name2 } = $$props;
  const attrStore = writable({});
  const ids = writable(createIds());
  $$unsubscribe_ids = subscribe(ids, (value2) => $ids = value2);
  const stores = { errors, value, constraints };
  if ($$props.config === void 0 && $$bindings.config && config !== void 0)
    $$bindings.config(config);
  if ($$props.name === void 0 && $$bindings.name && name2 !== void 0)
    $$bindings.name(name2);
  $$subscribe_errors({ errors, value, constraints } = formFieldProxy(config.form, name2), $$subscribe_value(), $$subscribe_constraints());
  $$subscribe_hasValidation({ getFieldAttrs, actions, hasValidation, hasDescription, handlers, setValue } = createFormField(name2, attrStore, value, errors, ids), $$subscribe_hasDescription());
  inputAttrs = getFieldAttrs({
    val: $value,
    errors: $errors,
    constraints: $constraints,
    hasValidation: $hasValidation,
    hasDescription: $hasDescription
  });
  attrs = {
    input: inputAttrs,
    label: { for: $ids.input },
    description: { id: $ids.description },
    validation: {
      id: $ids.validation,
      "aria-live": "assertive"
    }
  };
  $$unsubscribe_ids();
  $$unsubscribe_hasDescription();
  $$unsubscribe_hasValidation();
  $$unsubscribe_constraints();
  $$unsubscribe_errors();
  $$unsubscribe_value();
  return `${slots.default ? slots.default({
    stores,
    errors: $errors,
    value: $value,
    constraints: $constraints,
    handlers,
    attrs,
    actions,
    setValue
  }) : ``}`;
});
const Form_validation$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let attrs;
  let $$restProps = compute_rest_props($$props, ["tag"]);
  let $ids, $$unsubscribe_ids;
  let $errors, $$unsubscribe_errors;
  let { tag = "p" } = $$props;
  const { actions, errors, ids } = getFormField();
  $$unsubscribe_errors = subscribe(errors, (value) => $errors = value);
  $$unsubscribe_ids = subscribe(ids, (value) => $ids = value);
  if ($$props.tag === void 0 && $$bindings.tag && tag !== void 0)
    $$bindings.tag(tag);
  attrs = {
    "data-fs-validation": "",
    "data-fs-error": $errors ? "" : void 0,
    id: $ids.validation
  };
  $$unsubscribe_ids();
  $$unsubscribe_errors();
  return `${((tag$1) => {
    return tag$1 ? `<${tag}${spread([escape_object(attrs), escape_object($$restProps)], {})}>${is_void(tag$1) ? "" : `${$errors ? `${escape($errors)}` : ``}`}${is_void(tag$1) ? "" : `</${tag$1}>`}` : "";
  })(tag)}`;
});
const FORM_FIELD_SCHEMA = "FormFieldSchema";
const css = {
  code: ".absolute.svelte-1rmo61e.svelte-1rmo61e{position:absolute}.top-0.svelte-1rmo61e.svelte-1rmo61e{top:0}.inset-x-0.svelte-1rmo61e.svelte-1rmo61e{left:0px;right:0px}.pt-0.svelte-1rmo61e.svelte-1rmo61e{padding-top:0px}.pt-4.svelte-1rmo61e.svelte-1rmo61e{padding-top:1em}.hidden.svelte-1rmo61e.svelte-1rmo61e{height:0;overflow:hidden}.rotated.svelte-1rmo61e.svelte-1rmo61e{transform:rotate(180deg)}.super-debug.svelte-1rmo61e.svelte-1rmo61e{--_sd-bg-color:var(--sd-bg-color, var(--sd-vscode-bg-color, rgb(30, 41, 59)));position:relative;background-color:var(--_sd-bg-color);border-radius:0.5rem;overflow:hidden}.super-debug--collapse.svelte-1rmo61e.svelte-1rmo61e{display:block;width:100%;color:rgba(255, 255, 255, 0.25);background-color:rgba(255, 255, 255, 0.15);padding:5px 0;display:flex;justify-content:center;border-color:transparent;margin:0;padding:3px 0}.super-debug--collapse.svelte-1rmo61e.svelte-1rmo61e:is(:hover){color:rgba(255, 255, 255, 0.35);background-color:rgba(255, 255, 255, 0.25)}.super-debug--status.svelte-1rmo61e.svelte-1rmo61e{display:flex;padding:1em;padding-bottom:0;justify-content:space-between;font-family:Inconsolata, Monaco, Consolas, 'Lucida Console', 'Courier New', Courier, monospace}.super-debug--label.svelte-1rmo61e.svelte-1rmo61e{color:var(--sd-label-color, var(--sd-vscode-label-color, white))}.super-debug--promise-loading.svelte-1rmo61e.svelte-1rmo61e{color:var(--sd-promise-loading-color, var(--sd-vscode-promise-loading-color, #999))}.super-debug--promise-rejected.svelte-1rmo61e.svelte-1rmo61e{color:var(--sd-promise-rejected-color, var(--sd-vscode-promise-rejected-color, #ff475d))}.super-debug.svelte-1rmo61e pre.svelte-1rmo61e{color:var(--sd-code-default, var(--sd-vscode-code-default, #999));background-color:var(--_sd-bg-color);font-size:1em;margin-bottom:0;padding:1em 0 1em 1em}.info.svelte-1rmo61e.svelte-1rmo61e{color:var(--sd-info, var(--sd-vscode-info, rgb(85, 85, 255)))}.success.svelte-1rmo61e.svelte-1rmo61e{color:var(--sd-success, var(--sd-vscode-success, #2cd212))}.redirect.svelte-1rmo61e.svelte-1rmo61e{color:var(--sd-redirect, var(--sd-vscode-redirect, #03cae5))}.error.svelte-1rmo61e.svelte-1rmo61e{color:var(--sd-error, var(--sd-vscode-error, #ff475d))}.super-debug--code .key{color:var(--sd-code-key, var(--sd-vscode-code-key, #eab308))}.super-debug--code .string{color:var(--sd-code-string, var(--sd-vscode-code-string, #6ec687))}.super-debug--code .date{color:var(--sd-code-date, var(--sd-vscode-code-date, #f06962))}.super-debug--code .boolean{color:var(--sd-code-boolean, var(--sd-vscode-code-boolean, #79b8ff))}.super-debug--code .number{color:var(--sd-code-number, var(--sd-vscode-code-number, #af77e9))}.super-debug--code .bigint{color:var(--sd-code-bigint, var(--sd-vscode-code-bigint, #af77e9))}.super-debug--code .null{color:var(--sd-code-null, var(--sd-vscode-code-null, #238afe))}.super-debug--code .nan{color:var(--sd-code-nan, var(--sd-vscode-code-nan, #af77e9))}.super-debug--code .undefined{color:var(--sd-code-undefined, var(--sd-vscode-code-undefined, #238afe))}.super-debug--code .function{color:var(--sd-code-function, var(--sd-vscode-code-function, #f06962))}.super-debug--code .symbol{color:var(--sd-code-symbol, var(--sd-vscode-code-symbol, #4de0c5))}.super-debug--code .error{color:var(--sd-code-error, var(--sd-vscode-code-error, #ff475d))}.super-debug.svelte-1rmo61e pre.svelte-1rmo61e::-webkit-scrollbar{width:var(--sd-sb-width, var(--sd-vscode-sb-width, 1.25rem));height:var(--sd-sb-height, var(--sd-vscode-sb-height, 1.25rem))}.super-debug.svelte-1rmo61e pre.svelte-1rmo61e::-webkit-scrollbar-track{border-radius:12px;background-color:var(\r\n			--sd-sb-track-color,\r\n			var(--sd-vscode-sb-track-color, hsl(0, 0%, 40%, 0.2))\r\n		)}.super-debug.svelte-1rmo61e:is(:focus-within, :hover) pre.svelte-1rmo61e::-webkit-scrollbar-track{border-radius:12px;background-color:var(\r\n			--sd-sb-track-color-focus,\r\n			var(--sd-vscode-sb-track-color-focus, hsl(0, 0%, 50%, 0.2))\r\n		)}.super-debug.svelte-1rmo61e pre.svelte-1rmo61e::-webkit-scrollbar-thumb{border-radius:12px;background-color:var(\r\n			--sd-sb-thumb-color,\r\n			var(--sd-vscode-sb-thumb-color, hsl(217, 50%, 50%, 0.5))\r\n		)}.super-debug.svelte-1rmo61e:is(:focus-within, :hover) pre.svelte-1rmo61e::-webkit-scrollbar-thumb{border-radius:12px;background-color:var(\r\n			--sd-sb-thumb-color-focus,\r\n			var(--sd-vscode-sb-thumb-color-focus, hsl(217, 50%, 50%))\r\n		)}",
  map: null
};
function fileToJSON(file) {
  return {
    name: file.name,
    size: file.size,
    type: file.type,
    lastModified: new Date(file.lastModified)
  };
}
function assertPromise(data, raw, promise) {
  if (raw) {
    return false;
  }
  return promise || typeof data === "object" && data !== null && "then" in data && typeof data["then"] === "function";
}
function assertStore(data, raw) {
  if (raw) {
    return false;
  }
  return typeof data === "object" && data !== null && "subscribe" in data && typeof data["subscribe"] === "function";
}
const SuperDebug = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let themeStyle;
  let debugData;
  let $page, $$unsubscribe_page;
  let $debugData, $$unsubscribe_debugData = noop, $$subscribe_debugData = () => ($$unsubscribe_debugData(), $$unsubscribe_debugData = subscribe(debugData, ($$value) => $debugData = $$value), debugData);
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let { data } = $$props;
  let { display = true } = $$props;
  let { status = true } = $$props;
  let { label = "" } = $$props;
  let { stringTruncate = 120 } = $$props;
  let { ref = void 0 } = $$props;
  let { promise = false } = $$props;
  let { raw = false } = $$props;
  let { functions = false } = $$props;
  let { theme = "default" } = $$props;
  let { collapsible = false } = $$props;
  let { collapsed = false } = $$props;
  function syntaxHighlight(json) {
    switch (typeof json) {
      case "function": {
        return `<span class="function">[function ${json.name ?? "unnamed"}]</span>`;
      }
      case "symbol": {
        return `<span class="symbol">${json.toString()}</span>`;
      }
    }
    const encodedString = JSON.stringify(
      json,
      function(key, value) {
        if (value === void 0) {
          return "#}#undefined";
        }
        if (typeof this === "object" && this[key] instanceof Date) {
          return "#}D#" + (isNaN(this[key]) ? "Invalid Date" : value);
        }
        if (typeof value === "number") {
          if (value == Number.POSITIVE_INFINITY)
            return "#}#Inf";
          if (value == Number.NEGATIVE_INFINITY)
            return "#}#-Inf";
          if (isNaN(value))
            return "#}#NaN";
        }
        if (typeof value === "bigint") {
          return "#}BI#" + value;
        }
        if (typeof value === "function" && functions) {
          return `#}F#[function ${value.name}]`;
        }
        if (value instanceof Error) {
          return `#}E#${value.name}: ${value.message || value.cause || "(No error message)"}`;
        }
        if (typeof this === "object" && this[key] instanceof File) {
          return fileToJSON(this[key]);
        }
        return value;
      },
      2
    ).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    return encodedString.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g, function(match) {
      let cls = "number";
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = "key";
          match = match.slice(1, -2) + ":";
        } else {
          cls = "string";
          match = stringTruncate > 0 && match.length > stringTruncate ? match.slice(0, stringTruncate / 2) + `[..${match.length - stringTruncate}/${match.length}..]` + match.slice(-stringTruncate / 2) : match;
          if (match == '"#}#undefined"') {
            cls = "undefined";
            match = "undefined";
          } else if (match.startsWith('"#}D#')) {
            cls = "date";
            match = match.slice(5, -1);
          } else if (match == '"#}#NaN"') {
            cls = "nan";
            match = "NaN";
          } else if (match == '"#}#Inf"') {
            cls = "nan";
            match = "Infinity";
          } else if (match == '"#}#-Inf"') {
            cls = "nan";
            match = "-Infinity";
          } else if (match.startsWith('"#}BI#')) {
            cls = "bigint";
            match = match.slice(6, -1) + "n";
          } else if (match.startsWith('"#}F#')) {
            cls = "function";
            match = match.slice(5, -1);
          } else if (match.startsWith('"#}E#')) {
            cls = "error";
            match = match.slice(5, -1);
          }
        }
      } else if (/true|false/.test(match)) {
        cls = "boolean";
      } else if (/null/.test(match)) {
        cls = "null";
      }
      return '<span class="' + cls + '">' + match + "</span>";
    });
  }
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  if ($$props.display === void 0 && $$bindings.display && display !== void 0)
    $$bindings.display(display);
  if ($$props.status === void 0 && $$bindings.status && status !== void 0)
    $$bindings.status(status);
  if ($$props.label === void 0 && $$bindings.label && label !== void 0)
    $$bindings.label(label);
  if ($$props.stringTruncate === void 0 && $$bindings.stringTruncate && stringTruncate !== void 0)
    $$bindings.stringTruncate(stringTruncate);
  if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0)
    $$bindings.ref(ref);
  if ($$props.promise === void 0 && $$bindings.promise && promise !== void 0)
    $$bindings.promise(promise);
  if ($$props.raw === void 0 && $$bindings.raw && raw !== void 0)
    $$bindings.raw(raw);
  if ($$props.functions === void 0 && $$bindings.functions && functions !== void 0)
    $$bindings.functions(functions);
  if ($$props.theme === void 0 && $$bindings.theme && theme !== void 0)
    $$bindings.theme(theme);
  if ($$props.collapsible === void 0 && $$bindings.collapsible && collapsible !== void 0)
    $$bindings.collapsible(collapsible);
  if ($$props.collapsed === void 0 && $$bindings.collapsed && collapsed !== void 0)
    $$bindings.collapsed(collapsed);
  $$result.css.add(css);
  themeStyle = theme === "vscode" ? `
      --sd-vscode-bg-color: #1f1f1f;
      --sd-vscode-label-color: #cccccc;
      --sd-vscode-code-default: #8c8a89;
      --sd-vscode-code-key: #9cdcfe;
      --sd-vscode-code-string: #ce9171;
      --sd-vscode-code-number: #b5c180;
      --sd-vscode-code-boolean: #4a9cd6;
      --sd-vscode-code-null: #4a9cd6;
      --sd-vscode-code-undefined: #4a9cd6;
      --sd-vscode-code-nan: #4a9cd6;
      --sd-vscode-code-symbol: #4de0c5;
      --sd-vscode-sb-thumb-color: #35373a;
      --sd-vscode-sb-thumb-color-focus: #4b4d50;
    ` : void 0;
  $$subscribe_debugData(debugData = assertStore(data, raw) ? data : readable(data));
  $$unsubscribe_page();
  $$unsubscribe_debugData();
  return ` ${display ? `<div class="super-debug svelte-1rmo61e"${add_attribute("style", themeStyle, 0)}>${label || status ? `<div class="${"super-debug--status " + escape(label === "" ? "absolute inset-x-0 top-0" : "", true) + " svelte-1rmo61e"}"><div class="super-debug--label svelte-1rmo61e">${escape(label)}</div> ${status ? `<div class="${[
    "svelte-1rmo61e",
    ($page.status < 200 ? "info" : "") + " " + ($page.status >= 200 && $page.status < 300 ? "success" : "") + " " + ($page.status >= 300 && $page.status < 400 ? "redirect" : "") + " " + ($page.status >= 400 ? "error" : "")
  ].join(" ").trim()}">${escape($page.status)}</div>` : ``}</div>` : ``} <pre class="${[
    "super-debug--pre " + escape(label === "" ? "pt-4" : "pt-0", true) + " svelte-1rmo61e",
    collapsed ? "hidden" : ""
  ].join(" ").trim()}"${add_attribute("this", ref, 0)}><code class="super-debug--code">${slots.default ? slots.default({}) : `${assertPromise($debugData, raw, promise) ? `${function(__value) {
    if (is_promise(__value)) {
      __value.then(null, noop);
      return `<div class="super-debug--promise-loading svelte-1rmo61e" data-svelte-h="svelte-phqra4">Loading data...</div>`;
    }
    return function(result) {
      return `<!-- HTML_TAG_START -->${syntaxHighlight(assertStore(result, raw) ? get_store_value(result) : result)}<!-- HTML_TAG_END -->`;
    }(__value);
  }($debugData)}` : `<!-- HTML_TAG_START -->${syntaxHighlight($debugData)}<!-- HTML_TAG_END -->`}`}</code></pre> ${collapsible ? `<button type="button" class="super-debug--collapse svelte-1rmo61e"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" class="${["svelte-1rmo61e", collapsed ? "rotated" : ""].join(" ").trim()}"><path fill="currentColor" d="M4.08 11.92L12 4l7.92 7.92l-1.42 1.41l-5.5-5.5V22h-2V7.83l-5.5 5.5l-1.42-1.41M12 4h10V2H2v2h10Z"></path></svg></button>` : ``}</div>` : ``} `;
});
const Form = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let attrs;
  let $$restProps = compute_rest_props($$props, ["schema", "form", "options", "controlled", "asChild", "debug"]);
  let $errors, $$unsubscribe_errors;
  let $formStore, $$unsubscribe_formStore;
  let $allErrors, $$unsubscribe_allErrors;
  let $delayed, $$unsubscribe_delayed;
  let $submitting, $$unsubscribe_submitting;
  let $tainted, $$unsubscribe_tainted;
  let $timeout, $$unsubscribe_timeout;
  let $posted, $$unsubscribe_posted;
  let $formId, $$unsubscribe_formId;
  let $message, $$unsubscribe_message;
  let { schema } = $$props;
  let { form } = $$props;
  let { options = {} } = $$props;
  let { controlled = false } = $$props;
  const defaultOptions = { validators: schema, taintedMessage: null };
  const optionsWithDefaults = { ...defaultOptions, ...options };
  let { asChild = false } = $$props;
  let { debug = false } = $$props;
  function getSuperForm(controlled2, form2, options2) {
    if (controlled2) {
      return form2;
    }
    return superForm(form2, options2);
  }
  const superFrm = getSuperForm(controlled, form, optionsWithDefaults);
  setContext(FORM_CONTEXT, superFrm);
  setContext(FORM_FIELD_SCHEMA, schema);
  const { enhance: enhance2, form: formStore, allErrors, delayed, errors, reset, submitting, tainted, timeout, validate, posted, fields, message: message2, formId, restore, capture } = superFrm;
  $$unsubscribe_formStore = subscribe(formStore, (value) => $formStore = value);
  $$unsubscribe_allErrors = subscribe(allErrors, (value) => $allErrors = value);
  $$unsubscribe_delayed = subscribe(delayed, (value) => $delayed = value);
  $$unsubscribe_errors = subscribe(errors, (value) => $errors = value);
  $$unsubscribe_submitting = subscribe(submitting, (value) => $submitting = value);
  $$unsubscribe_tainted = subscribe(tainted, (value) => $tainted = value);
  $$unsubscribe_timeout = subscribe(timeout, (value) => $timeout = value);
  $$unsubscribe_posted = subscribe(posted, (value) => $posted = value);
  $$unsubscribe_message = subscribe(message2, (value) => $message = value);
  $$unsubscribe_formId = subscribe(formId, (value) => $formId = value);
  let config = { form: superFrm, schema };
  if ($$props.schema === void 0 && $$bindings.schema && schema !== void 0)
    $$bindings.schema(schema);
  if ($$props.form === void 0 && $$bindings.form && form !== void 0)
    $$bindings.form(form);
  if ($$props.options === void 0 && $$bindings.options && options !== void 0)
    $$bindings.options(options);
  if ($$props.controlled === void 0 && $$bindings.controlled && controlled !== void 0)
    $$bindings.controlled(controlled);
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0)
    $$bindings.asChild(asChild);
  if ($$props.debug === void 0 && $$bindings.debug && debug !== void 0)
    $$bindings.debug(debug);
  config = { form: superFrm, schema };
  attrs = {
    "data-fs-form": "",
    "data-fs-error": $errors ? "" : void 0
  };
  $$unsubscribe_errors();
  $$unsubscribe_formStore();
  $$unsubscribe_allErrors();
  $$unsubscribe_delayed();
  $$unsubscribe_submitting();
  $$unsubscribe_tainted();
  $$unsubscribe_timeout();
  $$unsubscribe_posted();
  $$unsubscribe_formId();
  $$unsubscribe_message();
  return `${asChild ? `${slots.default ? slots.default({
    config,
    formValues: $formStore,
    formStore,
    form: superFrm,
    enhance: enhance2,
    allErrors: $allErrors,
    delayed: $delayed,
    errors: $errors,
    reset,
    submitting: $submitting,
    tainted: $tainted,
    timeout: $timeout,
    validate,
    posted: $posted,
    fields,
    formId: $formId,
    restore,
    capture,
    message: $message
  }) : ``}` : `<form${spread([{ method: "POST" }, escape_object($$restProps), escape_object(attrs)], {})}>${slots.default ? slots.default({
    config,
    formStore,
    formValues: $formStore,
    form: superFrm,
    enhance: enhance2,
    attrs,
    allErrors: $allErrors,
    delayed: $delayed,
    errors: $errors,
    reset,
    submitting: $submitting,
    tainted: $tainted,
    timeout: $timeout,
    validate,
    posted: $posted,
    fields,
    formId: $formId,
    restore,
    capture,
    message: $message
  }) : ``} ${debug ? `${validate_component(SuperDebug, "SuperDebug").$$render($$result, { data: $formStore }, {}, {})}` : ``}</form>`}`;
});
function styleToString(style) {
  return Object.keys(style).reduce((str, key) => {
    if (style[key] === void 0)
      return str;
    return str + `${key}:${style[key]};`;
  }, "");
}
styleToString({
  position: "absolute",
  width: "25px",
  height: "25px",
  opacity: "0",
  margin: "0px",
  pointerEvents: "none",
  transform: "translateX(-100%)"
});
function getFormField() {
  return getContext(FORM_FIELD_CONTEXT);
}
const Form_item = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: className = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  return `<div${spread(
    [
      {
        class: escape_attribute_value(cn("space-y-2", className))
      },
      escape_object($$restProps)
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</div>`;
});
const Input = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class", "value"]);
  let { class: className = void 0 } = $$props;
  let { value = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  return `<input${spread(
    [
      {
        class: escape_attribute_value(cn("flex h-10 w-full border border-border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", className))
      },
      escape_object($$restProps)
    ],
    {}
  )}${add_attribute("value", value, 0)}>`;
});
const Form_input = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, []);
  let $attrStore, $$unsubscribe_attrStore;
  let $value, $$unsubscribe_value;
  const { attrStore, value } = getFormField();
  $$unsubscribe_attrStore = subscribe(attrStore, (value2) => $attrStore = value2);
  $$unsubscribe_value = subscribe(value, (value2) => $value = value2);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `${validate_component(Input, "Input").$$render(
      $$result,
      Object.assign({}, $attrStore, $$restProps, { value: $value }),
      {
        value: ($$value) => {
          $value = $$value;
          $$settled = false;
        }
      },
      {}
    )}`;
  } while (!$$settled);
  $$unsubscribe_attrStore();
  $$unsubscribe_value();
  return $$rendered;
});
const Textarea = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class", "value"]);
  let { class: className = void 0 } = $$props;
  let { value = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  return `<textarea${spread(
    [
      {
        class: escape_attribute_value(cn("flex min-h-[80px] w-full border border-border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", className))
      },
      escape_object($$restProps)
    ],
    {}
  )}>${escape(value || "")}</textarea>`;
});
const Form_textarea = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, []);
  let $attrStore, $$unsubscribe_attrStore;
  let $value, $$unsubscribe_value;
  const { attrStore, value } = getFormField();
  $$unsubscribe_attrStore = subscribe(attrStore, (value2) => $attrStore = value2);
  $$unsubscribe_value = subscribe(value, (value2) => $value = value2);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `${validate_component(Textarea, "Textarea").$$render(
      $$result,
      Object.assign({}, $attrStore, $$restProps, { value: $value }),
      {
        value: ($$value) => {
          $value = $$value;
          $$settled = false;
        }
      },
      {}
    )}`;
  } while (!$$settled);
  $$unsubscribe_attrStore();
  $$unsubscribe_value();
  return $$rendered;
});
const Label = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: className = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  return `${validate_component(Label$1, "LabelPrimitive.Root").$$render(
    $$result,
    Object.assign(
      {},
      {
        class: cn("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", className)
      },
      $$restProps
    ),
    {},
    {
      default: () => {
        return `${slots.default ? slots.default({}) : ``}`;
      }
    }
  )}`;
});
const Form_label = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let $ids, $$unsubscribe_ids;
  let $errors, $$unsubscribe_errors;
  let { class: className = void 0 } = $$props;
  const { errors, ids } = getFormField();
  $$unsubscribe_errors = subscribe(errors, (value) => $errors = value);
  $$unsubscribe_ids = subscribe(ids, (value) => $ids = value);
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  $$unsubscribe_ids();
  $$unsubscribe_errors();
  return `${validate_component(Label, "Label").$$render(
    $$result,
    Object.assign(
      {},
      { for: $ids.input },
      {
        class: cn($errors && "text-destructive", className)
      },
      $$restProps
    ),
    {},
    {
      default: () => {
        return `${slots.default ? slots.default({}) : ``}`;
      }
    }
  )}`;
});
const Form_validation = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: className = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  return `${validate_component(Form_validation$1, "FormPrimitive.Validation").$$render(
    $$result,
    Object.assign(
      {},
      {
        class: cn("text-sm font-medium text-destructive", className)
      },
      $$restProps
    ),
    {},
    {}
  )}`;
});
const Form_button = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, []);
  return `${validate_component(Button, "Button.Root").$$render($$result, Object.assign({}, { type: "submit" }, $$restProps), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Root = Form;
const Field = Form_field;
const Contact_form = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { form } = $$props;
  if ($$props.form === void 0 && $$bindings.form && form !== void 0)
    $$bindings.form(form);
  return `${validate_component(Root, "Form.Root").$$render(
    $$result,
    {
      method: "POST",
      class: "w-full",
      form,
      schema: contactSchema
    },
    {},
    {
      default: ({ config }) => {
        return `<div${add_attribute("class", `flex flex-col`, 0)}>${validate_component(Field, "Form.Field").$$render($$result, { config, name: "username" }, {}, {
          default: () => {
            return `<div class="flex flex-col h-full w-full gap-5">${validate_component(Form_item, "Form.Item").$$render($$result, { class: "" }, {}, {
              default: () => {
                return `${validate_component(Form_label, "Form.Label").$$render($$result, { class: "" }, {}, {
                  default: () => {
                    return `${escape(name())}`;
                  }
                })} ${validate_component(Form_validation, "Form.Validation").$$render($$result, { class: "inline" }, {}, {})} ${validate_component(Form_input, "Form.Input").$$render($$result, { class: "bg-foreground" }, {}, {})}`;
              }
            })} ${validate_component(Form_item, "Form.Item").$$render($$result, {}, {}, {
              default: () => {
                return `${validate_component(Form_label, "Form.Label").$$render($$result, {}, {}, {
                  default: () => {
                    return `${escape(email())}`;
                  }
                })} ${validate_component(Form_validation, "Form.Validation").$$render($$result, { class: "inline" }, {}, {})} ${validate_component(Form_input, "Form.Input").$$render($$result, { class: "bg-foreground" }, {}, {})}`;
              }
            })} ${validate_component(Form_item, "Form.Item").$$render($$result, { class: " basis-1/2 " }, {}, {
              default: () => {
                return `${validate_component(Form_label, "Form.Label").$$render($$result, {}, {}, {
                  default: () => {
                    return `${escape(message())}`;
                  }
                })} ${validate_component(Form_validation, "Form.Validation").$$render($$result, { class: "inline bg-red-400" }, {}, {})} ${validate_component(Form_textarea, "Form.Textarea").$$render($$result, { class: "min-h-[200px] bg-foreground" }, {}, {})}`;
              }
            })}</div>`;
          }
        })} <div class="pt-10">${validate_component(Form_button, "Form.Button").$$render($$result, { size: "lg", class: "float-right" }, {}, {
          default: () => {
            return `${escape(submit())}`;
          }
        })}</div></div>`;
      }
    }
  )}`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `<div class="relative flex min-h-dvh w-full items-center justify-center overflow-hidden bg-foreground text-background"><div class="absolute inset-0 z-10 grid md:grid-cols-5">${each([1, 2, 3, 4, 5], (_) => {
    return `<div class="border-l-[0.5px]"></div>`;
  })}</div> <div class="container z-20 py-10 "><h1 class="py-10 text-center text-6xl">${escape(contact_page_heading())}</h1> <div class="flex flex-col-reverse md:flex-row w-full items-center justify-center"><div class="basis-1/2">${validate_component(Contact_form, "ContactForm").$$render($$result, { form: data.form }, {}, {})}</div> <p class="basis-1/2 p-10">${escape(contact_page_description())}</p></div></div></div>`;
});
export {
  Page as default
};
