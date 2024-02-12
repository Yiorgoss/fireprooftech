import { c as create_ssr_component, v as validate_component, i as spread, j as escape_attribute_value, k as escape_object, s as setContext, l as hasContext, f as getContext, h as compute_rest_props, o as onDestroy, a as subscribe } from "./ssr.js";
import { p as public_env } from "./shared-server.js";
import { p as cn, B as Button } from "./messages.js";
import { w as writable } from "./index.js";
import { I as Icon } from "./Icon.js";
const globals = typeof window !== "undefined" ? window : typeof globalThis !== "undefined" ? globalThis : (
  // @ts-ignore Node typings have this
  global
);
const Chevron_left = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [["path", { "d": "m15 18-6-6 6-6" }]];
  return `  ${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "chevron-left" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const ChevronLeft = Chevron_left;
const Chevron_right = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [["path", { "d": "m9 18 6-6-6-6" }]];
  return `  ${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "chevron-right" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const ChevronRight = Chevron_right;
var REGEX_VERSION$1 = /\/v\d+\//;
var REGEX_FORMAT$1 = /\.(ai|avif|gif|png|webp|bmp|bw|djvu|dng|ps|ept|eps|eps3|fbx|flif|gif|glb|gltf|heif|heic|ico|indd|jpg|jpe|jpeg|jp2|wdp|jxr|hdp|obj|pdf|ply|png|psd|arw|cr2|svg|tga|tif|tiff|u3ma|usdz|webp|3g2|3gp|avi|flv|m3u8|ts|m2ts|mts|mov|mkv|mp4|mpeg|mpd|mxf|ogv|webm|wmv)$/i;
var REGEX_URL$1 = /https?:\/\/(?<host>[^\/]+)\/(?<cloudName>[^\/]+)\/(?<assetType>image|images|video|videos|raw|files)\/(?<deliveryType>upload|fetch|private|authenticated|sprite|facebook|twitter|youtube|vimeo)?\/?(?<signature>s\-\-[a-zA-Z0-9]+\-\-)?\/?(?<transformations>(?:[^_\/]+_[^,\/]+,?\/?)*\/)*(?<version>v\d+|\w{1,2})\/(?<publicId>[^\s]+)$/;
var ASSET_TYPES_SEO$1 = ["images", "videos", "files"];
function parseUrl$1(src) {
  var _a, _b, _c, _d;
  if (typeof src !== "string") {
    throw new Error(`Failed to parse URL: Invalid src of type ${typeof src}`);
  }
  const hasVersion = REGEX_VERSION$1.test(src);
  if (!hasVersion) {
    throw new Error(`Invalid src: Does not include version (Ex: /v1234/)`);
  }
  const [baseUrlWithExtension, queryString] = src.split("?");
  const formatMatches = baseUrlWithExtension.match(REGEX_FORMAT$1);
  let baseUrl = baseUrlWithExtension;
  let format;
  if (formatMatches !== null) {
    format = `${formatMatches[0]}`;
    baseUrl = baseUrlWithExtension.replace(new RegExp(`${format}$`), "");
  }
  const results = baseUrl.match(REGEX_URL$1);
  const transformations = (_b = (_a = results == null ? void 0 : results.groups) == null ? void 0 : _a.transformations) == null ? void 0 : _b.split("/").filter((t) => !!t);
  const parts = {
    ...results == null ? void 0 : results.groups,
    format,
    seoSuffix: void 0,
    transformations: transformations || [],
    queryParams: {},
    version: ((_c = results == null ? void 0 : results.groups) == null ? void 0 : _c.version) ? parseInt(results.groups.version.replace("v", "")) : void 0
  };
  if (queryString) {
    parts.queryParams = queryString.split("&").reduce((prev, curr) => {
      const [key, value] = curr.split("=");
      prev[key] = value;
      return prev;
    }, {});
  }
  if (parts.assetType && ASSET_TYPES_SEO$1.includes(parts.assetType)) {
    const publicIdParts = ((_d = parts.publicId) == null ? void 0 : _d.split("/")) || [];
    parts.seoSuffix = publicIdParts.pop();
    parts.publicId = publicIdParts.join("/");
  }
  return parts;
}
function getTransformations(src) {
  const { transformations = [] } = parseUrl$1(src) || {};
  return transformations.map((t) => t.split(","));
}
function isObject(a2) {
  if (typeof a2 !== "object" || a2 instanceof Array) {
    return false;
  } else {
    return true;
  }
}
class Config {
  filterOutNonSupportedKeys(userProvidedConfig, validKeys) {
    const obj = /* @__PURE__ */ Object.create({});
    if (isObject(userProvidedConfig)) {
      Object.keys(userProvidedConfig).forEach((key) => {
        if (validKeys.indexOf(key) >= 0) {
          obj[key] = userProvidedConfig[key];
        } else {
          console.warn("Warning - unsupported key provided to configuration: ", key);
        }
      });
      return obj;
    } else {
      return /* @__PURE__ */ Object.create({});
    }
  }
}
const ALLOWED_URL_CONFIG = [
  "cname",
  "secureDistribution",
  "privateCdn",
  "signUrl",
  "longUrlSignature",
  "shorten",
  "useRootPath",
  "secure",
  "forceVersion",
  "analytics",
  "queryParams"
];
class URLConfig extends Config {
  /**
   * @param {IURLConfig} userURLConfig
   */
  constructor(userURLConfig) {
    super();
    const urlConfig = this.filterOutNonSupportedKeys(userURLConfig, ALLOWED_URL_CONFIG);
    Object.assign(this, {
      secure: true
    }, urlConfig);
  }
  extend(userURLConfig) {
    const urlConfig = this.filterOutNonSupportedKeys(userURLConfig, ALLOWED_URL_CONFIG);
    return new URLConfig(Object.assign({}, this, urlConfig));
  }
  /**
   * @param {string} value Sets the cname
   */
  setCname(value) {
    this.cname = value;
    return this;
  }
  /**
   * @param {string} value Sets the secureDistribution
   */
  setSecureDistribution(value) {
    this.secureDistribution = value;
    return this;
  }
  /**
   * @param {boolean} value Sets whether to use a private CDN (Removes cloudName from URL)
   */
  setPrivateCdn(value) {
    this.privateCdn = value;
    return this;
  }
  /**
   * @param value Sets whether or not to sign the URL
   */
  setSignUrl(value) {
    this.signUrl = value;
    return this;
  }
  /**
   * @param value Sets whether or not to use a long signature
   */
  setLongUrlSignature(value) {
    this.longUrlSignature = value;
    return this;
  }
  /**
   * @param value Sets whether or not to shorten the URL
   */
  setShorten(value) {
    this.shorten = value;
    return this;
  }
  /**
   * @param value Sets whether or not to use a root path
   */
  setUseRootPath(value) {
    this.useRootPath = value;
    return this;
  }
  /**
   * @param value Sets whether or not to deliver the asset through https
   */
  setSecure(value) {
    this.secure = value;
    return this;
  }
  /**
   * @param value Sets whether to force a version in the URL
   */
  setForceVersion(value) {
    this.forceVersion = value;
    return this;
  }
  /**
   * @param params Sets additional params
   */
  setQueryParams(params) {
    this.queryParams = params;
    return this;
  }
}
class QualifierValue {
  /**
   *
   * @param {QualifierValue | QualifierValue[] | any[] | string | number}qualifierValue
   */
  constructor(qualifierValue) {
    this.values = [];
    this.delimiter = ":";
    if (this.hasValue(qualifierValue)) {
      this.addValue(qualifierValue);
    }
  }
  /**
   * @description Joins the provided values with the provided delimiter
   */
  toString() {
    return this.values.join(this.delimiter);
  }
  /**
   * @description Checks if the provided argument has a value
   * @param {any} v
   * @private
   * @return {boolean}
   */
  hasValue(v) {
    return typeof v !== "undefined" && v !== null && v !== "";
  }
  /**
   * @desc Adds a value for the this qualifier instance
   * @param {any} value
   * @return {this}
   */
  addValue(value) {
    if (Array.isArray(value)) {
      this.values = this.values.concat(value);
    } else {
      this.values.push(value);
    }
    this.values = this.values.filter((v) => this.hasValue(v));
    return this;
  }
  /**
   * @description Sets the delimiter for this instance
   * @param delimiter
   */
  setDelimiter(delimiter) {
    this.delimiter = delimiter;
    return this;
  }
}
class UnsupportedError extends Error {
  constructor(message = "Unsupported") {
    super(message);
  }
}
function createUnsupportedError(message) {
  return new UnsupportedError(message);
}
function qualifierToJson() {
  return this._qualifierModel || { error: createUnsupportedError(`unsupported qualifier ${this.constructor.name}`) };
}
class QualifierModel {
  constructor() {
    this._qualifierModel = {};
  }
  toJson() {
    return qualifierToJson.apply(this);
  }
}
class Qualifier extends QualifierModel {
  constructor(key, qualifierValue) {
    super();
    this.delimiter = "_";
    this.key = key;
    if (qualifierValue instanceof QualifierValue) {
      this.qualifierValue = qualifierValue;
    } else {
      this.qualifierValue = new QualifierValue();
      this.qualifierValue.addValue(qualifierValue);
    }
  }
  toString() {
    const { key, delimiter, qualifierValue } = this;
    return `${key}${delimiter}${qualifierValue.toString()}`;
  }
  addValue(value) {
    this.qualifierValue.addValue(value);
    return this;
  }
}
class FlagQualifier extends Qualifier {
  constructor(flagType, flagValue) {
    let qualifierValue;
    if (flagValue) {
      qualifierValue = new QualifierValue([flagType, `${flagValue}`]).setDelimiter(":");
    } else {
      qualifierValue = flagType;
    }
    super("fl", qualifierValue);
    this.flagValue = flagValue;
  }
  toString() {
    return super.toString().replace(/\./, "%2E");
  }
  getFlagValue() {
    return this.flagValue;
  }
}
function mapToSortedArray(map, flags2) {
  const array = Array.from(map.entries());
  flags2.forEach((flag) => {
    array.push(["fl", flag]);
  });
  return array.sort().map((v) => v[1]);
}
function actionToJson() {
  var _a, _b, _c;
  const actionModelIsNotEmpty = this._actionModel && Object.keys(this._actionModel).length;
  const sourceTransformationError = (_c = (_b = (_a = this._actionModel) === null || _a === void 0 ? void 0 : _a.source) === null || _b === void 0 ? void 0 : _b.transformation) === null || _c === void 0 ? void 0 : _c.error;
  if (sourceTransformationError && sourceTransformationError instanceof Error) {
    return { error: sourceTransformationError };
  }
  if (actionModelIsNotEmpty) {
    return this._actionModel;
  }
  return { error: createUnsupportedError(`unsupported action ${this.constructor.name}`) };
}
class ActionModel {
  constructor() {
    this._actionModel = {};
  }
  toJson() {
    return actionToJson.apply(this);
  }
}
class Action extends ActionModel {
  constructor() {
    super(...arguments);
    this.qualifiers = /* @__PURE__ */ new Map();
    this.flags = [];
    this.delimiter = ",";
    this.actionTag = "";
  }
  prepareQualifiers() {
  }
  /**
   * @description Returns the custom name tag that was given to this action
   * @return {string}
   */
  getActionTag() {
    return this.actionTag;
  }
  /**
   * @description Sets the custom name tag for this action
   * @return {this}
   */
  setActionTag(tag) {
    this.actionTag = tag;
    return this;
  }
  /**
   * @description Calls toString() on all child qualifiers (implicitly by using .join()).
   * @return {string}
   */
  toString() {
    this.prepareQualifiers();
    return mapToSortedArray(this.qualifiers, this.flags).join(this.delimiter);
  }
  /**
   * @description Adds the parameter to the action.
   * @param {SDK.Qualifier} qualifier
   * @return {this}
   */
  addQualifier(qualifier) {
    if (typeof qualifier === "string") {
      const [key, value] = qualifier.toLowerCase().split("_");
      if (key === "fl") {
        this.flags.push(new FlagQualifier(value));
      } else {
        this.qualifiers.set(key, new Qualifier(key, value));
      }
    } else {
      this.qualifiers.set(qualifier.key, qualifier);
    }
    return this;
  }
  /**
   * @description Adds a flag to the current action.
   * @param {Qualifiers.Flag} flag
   * @return {this}
   */
  addFlag(flag) {
    if (typeof flag === "string") {
      this.flags.push(new FlagQualifier(flag));
    } else {
      if (flag instanceof FlagQualifier) {
        this.flags.push(flag);
      }
    }
    return this;
  }
  addValueToQualifier(qualifierKey, qualifierValue) {
    this.qualifiers.get(qualifierKey).addValue(qualifierValue);
    return this;
  }
}
class BackgroundColor extends Action {
  constructor(color) {
    super();
    this.addQualifier(new Qualifier("b", new QualifierValue(color).setDelimiter("_")));
  }
}
function prepareColor(color) {
  if (color) {
    return color.match(/^#/) ? `rgb:${color.substr(1)}` : color;
  } else {
    return color;
  }
}
class RawAction {
  constructor(raw) {
    this.raw = raw;
  }
  toString() {
    return this.raw;
  }
  toJson() {
    return { error: createUnsupportedError(`unsupported action ${this.constructor.name}`) };
  }
}
function isErrorObject(obj) {
  const errorObj = obj;
  return "error" in errorObj && !!errorObj.error;
}
function lossy() {
  return new FlagQualifier("lossy");
}
function preserveTransparency() {
  return new FlagQualifier("preserve_transparency");
}
function progressive(mode) {
  return new FlagQualifier("progressive", mode);
}
class FormatQualifier extends QualifierValue {
  constructor(val) {
    super(val);
    this.val = val;
  }
  getValue() {
    return this.val;
  }
}
function objectFlip(obj) {
  const result = {};
  Object.keys(obj).forEach((key) => {
    result[obj[key]] = key;
  });
  return result;
}
const ACTION_TYPE_TO_CROP_MODE_MAP = {
  limitFit: "limit",
  limitFill: "lfill",
  minimumFit: "mfit",
  thumbnail: "thumb",
  limitPad: "lpad",
  minimumPad: "mpad"
};
const ACTION_TYPE_TO_DELIVERY_MODE_MAP = {
  colorSpace: "cs",
  dpr: "dpr",
  density: "dn",
  defaultImage: "d",
  format: "f",
  quality: "q"
};
const ACTION_TYPE_TO_EFFECT_MODE_MAP = {
  redEye: "redeye",
  advancedRedEye: "adv_redeye",
  oilPaint: "oil_paint",
  unsharpMask: "unsharp_mask",
  makeTransparent: "make_transparent",
  generativeRestore: "gen_restore",
  upscale: "upscale"
};
const ACTION_TYPE_TO_QUALITY_MODE_MAP = {
  autoBest: "auto:best",
  autoEco: "auto:eco",
  autoGood: "auto:good",
  autoLow: "auto:low",
  jpegminiHigh: "jpegmini:1",
  jpegminiMedium: "jpegmini:2",
  jpegminiBest: "jpegmini:0"
};
const ACTION_TYPE_TO_STREAMING_PROFILE_MODE_MAP = {
  fullHd: "full_hd",
  fullHdWifi: "full_hd_wifi",
  fullHdLean: "full_hd_lean",
  hdLean: "hd_lean"
};
const CHROMA_VALUE_TO_CHROMA_MODEL_ENUM = {
  444: "CHROMA_444",
  420: "CHROMA_420"
};
const COLOR_SPACE_MODEL_MODE_TO_COLOR_SPACE_MODE_MAP = {
  "noCmyk": "no_cmyk",
  "keepCmyk": "keep_cmyk",
  "tinySrgb": "tinysrgb",
  "srgbTrueColor": "srgb:truecolor"
};
objectFlip(CHROMA_VALUE_TO_CHROMA_MODEL_ENUM);
objectFlip(COLOR_SPACE_MODEL_MODE_TO_COLOR_SPACE_MODE_MAP);
objectFlip(ACTION_TYPE_TO_CROP_MODE_MAP);
const DELIVERY_MODE_TO_ACTION_TYPE_MAP = objectFlip(ACTION_TYPE_TO_DELIVERY_MODE_MAP);
objectFlip(ACTION_TYPE_TO_EFFECT_MODE_MAP);
objectFlip(ACTION_TYPE_TO_QUALITY_MODE_MAP);
objectFlip(ACTION_TYPE_TO_STREAMING_PROFILE_MODE_MAP);
class DeliveryAction extends Action {
  /**
   * @param {string} deliveryKey A generic Delivery Action Key (such as q, f, dn, etc.)
   * @param {string} deliveryType A Format Qualifiers for the action, such as Quality.auto()
   * @param {string} modelProperty internal model property of the action, for example quality uses `level` while dpr uses `density`
   * @see Visit {@link Actions.Delivery|Delivery} for an example
   */
  constructor(deliveryKey, deliveryType, modelProperty) {
    super();
    this._actionModel = {};
    let deliveryTypeValue;
    if (deliveryType instanceof FormatQualifier) {
      deliveryTypeValue = deliveryType.getValue();
    } else {
      deliveryTypeValue = deliveryType;
    }
    this._actionModel.actionType = DELIVERY_MODE_TO_ACTION_TYPE_MAP[deliveryKey];
    this._actionModel[modelProperty] = deliveryTypeValue;
    this.addQualifier(new Qualifier(deliveryKey, deliveryType));
  }
}
class ProgressiveQualifier extends FlagQualifier {
  constructor(mode) {
    super("progressive", mode);
  }
}
class DeliveryFormatAction extends DeliveryAction {
  constructor(deliveryKey, deliveryType) {
    super(deliveryKey, deliveryType, "formatType");
  }
  /**
   * @description Uses lossy compression when delivering animated GIF files.
   * @return {this}
   */
  lossy() {
    this._actionModel.lossy = true;
    this.addFlag(lossy());
    return this;
  }
  /**
   * @description Uses progressive compression when delivering JPG file format.
   * @return {this}
   */
  progressive(mode) {
    if (mode instanceof ProgressiveQualifier) {
      this._actionModel.progressive = { mode: mode.getFlagValue() };
      this.addFlag(mode);
    } else {
      this._actionModel.progressive = { mode };
      this.addFlag(progressive(mode));
    }
    return this;
  }
  /**
   * @description Ensures that images with a transparency channel are delivered in PNG format.
   */
  preserveTransparency() {
    this._actionModel.preserveTransparency = true;
    this.addFlag(preserveTransparency());
    return this;
  }
  static fromJson(actionModel) {
    const { formatType, lossy: lossy2, progressive: progressive2, preserveTransparency: preserveTransparency2 } = actionModel;
    let result;
    if (formatType) {
      result = new this("f", formatType);
    } else {
      result = new this("f");
    }
    if (progressive2) {
      if (progressive2.mode) {
        result.progressive(progressive2.mode);
      } else {
        result.progressive();
      }
    }
    lossy2 && result.lossy();
    preserveTransparency2 && result.preserveTransparency();
    return result;
  }
}
class Transformation {
  constructor() {
    this.actions = [];
  }
  /**
   * @param {SDK.Action | string} action
   * @return {this}
   */
  addAction(action) {
    let actionToAdd;
    if (typeof action === "string") {
      if (action.indexOf("/") >= 0) {
        throw "addAction cannot accept a string with a forward slash in it - /, use .addTransformation() instead";
      } else {
        actionToAdd = new RawAction(action);
      }
    } else {
      actionToAdd = action;
    }
    this.actions.push(actionToAdd);
    return this;
  }
  /**
   * @description Allows the injection of a raw transformation as a string into the transformation, or a Transformation instance that was previously created
   * @param {string | SDK.Transformation} tx
   * @example
   * import {Transformation} from "@cloudinary/url-gen";
   *
   * const transformation = new Transformation();
   * transformation.addTransformation('w_100/w_200/w_300');
   * @return {this}
   */
  addTransformation(tx) {
    if (tx instanceof Transformation) {
      this.actions = this.actions.concat(tx.actions);
    } else {
      this.actions.push(new RawAction(tx));
    }
    return this;
  }
  /**
   * @return {string}
   */
  toString() {
    return this.actions.map((action) => {
      return action.toString();
    }).filter((a2) => a2).join("/");
  }
  /**
   * @description Delivers an animated GIF.
   * @param {AnimatedAction} animatedAction
   * @return {this}
   */
  animated(animatedAction) {
    return this.addAction(animatedAction);
  }
  /**
   * @description Adds a border around the image.
   * @param {Border} borderAction
   * @return {this}
   */
  border(borderAction) {
    return this.addAction(borderAction);
  }
  /**
   * @description Adjusts the shape of the delivered image. </br>
   * <b>Learn more:</b> {@link https://cloudinary.com/documentation/effects_and_artistic_enhancements#distort|Shape changes and distortion effects}
   * @param {IReshape} reshapeAction
   * @return {this}
   */
  reshape(reshapeAction) {
    return this.addAction(reshapeAction);
  }
  /**
   * @description Resize the asset using provided resize action
   * @param {ResizeSimpleAction} resizeAction
   * @return {this}
   */
  resize(resizeAction) {
    return this.addAction(resizeAction);
  }
  /**
   * @desc An alias to Action Delivery.quality
   * @param {string|number} quality
   * @return {this}
   */
  quality(quality) {
    this.addAction(new DeliveryFormatAction("q", quality));
    return this;
  }
  /**
   * @desc An alias to Action Delivery.format
   * @param {string} format
   * @return {this}
   */
  format(format) {
    this.addAction(new DeliveryFormatAction("f", format));
    return this;
  }
  /**
   * @description Rounds the specified corners of an image.
   * @param roundCornersAction
   * @return {this}
   */
  roundCorners(roundCornersAction) {
    return this.addAction(roundCornersAction);
  }
  /**
   * @description Adds an overlay over the base image.
   * @param {LayerAction} overlayAction
   * @return {this}
   */
  overlay(overlayAction) {
    return this.addAction(overlayAction);
  }
  /**
   * @description Adds an underlay under the base image.
   * @param {LayerAction} underlayAction
   * @return {this}
   */
  underlay(underlayAction) {
    underlayAction.setLayerType("u");
    return this.addAction(underlayAction);
  }
  /**
   * @description Defines an new user variable.
   * @param {VariableAction} variableAction
   * @return {this}
   */
  addVariable(variableAction) {
    return this.addAction(variableAction);
  }
  /**
   * @description Specifies a condition to be met before applying a transformation.
   * @param {ConditionalAction} conditionAction
   * @return {this}
   */
  conditional(conditionAction) {
    return this.addAction(conditionAction);
  }
  /**
   * @description Applies a filter or an effect on an asset.
   * @param {SimpleEffectAction} effectAction
   * @return {this}
   */
  effect(effectAction) {
    return this.addAction(effectAction);
  }
  /**
   * @description Applies adjustment effect on an asset.
   * @param action
   * @return {this}
   */
  adjust(action) {
    return this.addAction(action);
  }
  /**
   * @description Rotates the asset by the given angle.
   * @param {RotateAction} rotateAction
   * @return {this}
   */
  rotate(rotateAction) {
    return this.addAction(rotateAction);
  }
  /**
   * @description Applies a pre-defined named transformation of the given name.
   * @param {NamedTransformation} namedTransformation
   * @return {this}
   */
  namedTransformation(namedTransformation) {
    return this.addAction(namedTransformation);
  }
  /**
   * @description Applies delivery action.
   * @param deliveryAction
   * @return {this}
   */
  delivery(deliveryAction) {
    return this.addAction(deliveryAction);
  }
  /**
   * @description Sets the color of the background.
   * @param {Qualifiers.Color} color
   * @return {this}
   */
  backgroundColor(color) {
    return this.addAction(new BackgroundColor(prepareColor(color)));
  }
  /**
   * @description Adds a layer in a Photoshop document.
   * @param action
   * @return {this}
   */
  psdTools(action) {
    return this.addAction(action);
  }
  /**
   * @description Extracts an image or a page using an index, a range, or a name from a layered media asset.
   * @param action
   * @return {this}
   */
  extract(action) {
    return this.addAction(action);
  }
  /**
   * @description Adds a flag as a separate action.
   * @param {Qualifiers.Flag | string} flagQualifier
   * @return {this}
   */
  addFlag(flagQualifier) {
    const action = new Action();
    let flagToAdd = flagQualifier;
    if (typeof flagQualifier === "string") {
      flagToAdd = new FlagQualifier(flagQualifier);
    }
    action.addQualifier(flagToAdd);
    return this.addAction(action);
  }
  /**
   * @description Inject a custom function into the image transformation pipeline.
   * @return {this}
   */
  customFunction(customFunction) {
    return this.addAction(customFunction);
  }
  /**
   * Transcodes the video (or audio) to another format.
   * @param {Action} action
   * @return {this}
   */
  transcode(action) {
    return this.addAction(action);
  }
  /**
   * Applies the specified video edit action.
   *
   * @param {videoEditType} action
   * @return {this}
   */
  videoEdit(action) {
    return this.addAction(action);
  }
  toJson() {
    const actions = [];
    for (const action of this.actions) {
      const json = action.toJson();
      if (isErrorObject(json)) {
        return json;
      }
      actions.push(json);
    }
    return { actions };
  }
}
class ImageTransformation extends Transformation {
}
class VideoTransformation extends Transformation {
}
function isUrl(publicID) {
  return publicID.match(/^https?:\//);
}
function isFileName(publicID) {
  return publicID.indexOf("/") < 0;
}
function publicIDContainsVersion(publicID) {
  return publicID.match(/^v[0-9]+/);
}
function getUrlPrefix(cloudName, urlConfig) {
  const secure = urlConfig.secure;
  const privateCDN = urlConfig.privateCdn;
  const cname = urlConfig.cname;
  const secureDistribution = urlConfig.secureDistribution;
  if (!secure && !cname) {
    return `http://res.cloudinary.com/${cloudName}`;
  }
  if (secure && !secureDistribution && privateCDN) {
    return `https://${cloudName}-res.cloudinary.com`;
  }
  if (secure && !secureDistribution) {
    return `https://res.cloudinary.com/${cloudName}`;
  }
  if (secure && secureDistribution && privateCDN) {
    return `https://${secureDistribution}`;
  }
  if (secure && secureDistribution) {
    return `https://${secureDistribution}/${cloudName}`;
  }
  if (!secure && cname) {
    return `http://${cname}/${cloudName}`;
  } else {
    return "ERROR";
  }
}
function handleAssetType(assetType) {
  if (!assetType) {
    return "image";
  }
  return assetType;
}
function handleDeliveryType(deliveryType) {
  if (!deliveryType) {
    return "upload";
  }
  return deliveryType;
}
function getUrlVersion(publicID, version2, forceVersion) {
  const shouldForceVersion = forceVersion !== false;
  if (version2) {
    return `v${version2}`;
  }
  if (publicIDContainsVersion(publicID) || isUrl(publicID) || isFileName(publicID)) {
    return "";
  }
  return shouldForceVersion ? "v1" : "";
}
function stringPad(value, _targetLength, _padString) {
  let targetLength = _targetLength >> 0;
  let padString = String(typeof _padString !== "undefined" ? _padString : " ");
  if (value.length > targetLength) {
    return String(value);
  } else {
    targetLength = targetLength - value.length;
    if (targetLength > padString.length) {
      padString += repeatStringNumTimes(padString, targetLength / padString.length);
    }
    return padString.slice(0, targetLength) + String(value);
  }
}
function repeatStringNumTimes(string, _times) {
  let times = _times;
  let repeatedString = "";
  while (times > 0) {
    repeatedString += string;
    times--;
  }
  return repeatedString;
}
const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
const base64Map = {};
let num = 0;
chars.split("").forEach((char) => {
  let key = num.toString(2);
  key = stringPad(key, 6, "0");
  base64Map[key] = char;
  num++;
});
function reverseVersion(semVer) {
  if (semVer.split(".").length < 2) {
    throw new Error("invalid semVer, must have at least two segments");
  }
  return semVer.split(".").reverse().join(".");
}
function padVersion(semVer) {
  if (semVer.split(".").length < 2) {
    throw new Error("invalid semVer, must have at least two segments");
  }
  return semVer.split(".").map((segment) => {
    const asNumber = +segment;
    if (isNaN(asNumber) || asNumber < 0) {
      throw "Invalid version number provided";
    }
    return stringPad(segment, 2, "0");
  }).join(".");
}
function encodeVersion(semVer) {
  let strResult = "";
  const parts = semVer.split(".").length;
  const paddedStringLength = parts * 6;
  const reversedSemver = reverseVersion(semVer);
  const paddedSemver = padVersion(reversedSemver);
  const num2 = parseInt(paddedSemver.split(".").join(""));
  let paddedBinary = num2.toString(2);
  paddedBinary = stringPad(paddedBinary, paddedStringLength, "0");
  if (paddedBinary.length % 6 !== 0) {
    throw "Version must be smaller than 43.21.26)";
  }
  paddedBinary.match(/.{1,6}/g).forEach((bitString) => {
    strResult += base64Map[bitString];
  });
  return strResult;
}
function getAnalyticsOptions(options) {
  const analyticsOptions = {
    sdkSemver: options.sdkSemver,
    techVersion: options.techVersion,
    sdkCode: options.sdkCode,
    product: options.product,
    feature: "0",
    osType: options.osType,
    osVersion: options.osVersion
  };
  if (options.accessibility) {
    analyticsOptions.feature = "D";
  }
  if (options.lazyload) {
    analyticsOptions.feature = "C";
  }
  if (options.responsive) {
    analyticsOptions.feature = "A";
  }
  if (options.placeholder) {
    analyticsOptions.feature = "B";
  }
  return analyticsOptions;
}
const packageVersion = "1.16.0";
function encodeOSVersion(semVer) {
  const [major, minor] = semVer.split(".");
  const binaryMajorVersion = parseInt(major).toString(2);
  const binaryMinorVersion = parseInt(minor).toString(2);
  const paddedMajor = binaryMajorVersion.padStart(6, "0");
  const paddedMinor = binaryMinorVersion.padStart(6, "0");
  return base64Map[paddedMajor] + base64Map[paddedMinor];
}
function getNodeVersion() {
  const failedVersion = "0.0.0";
  if (typeof window !== "undefined") {
    return failedVersion;
  } else {
    try {
      return process.versions.node || failedVersion;
    } catch (e) {
      return failedVersion;
    }
  }
}
function ensureShapeOfTrackedProperties(trackedAnalytics) {
  const defaults = {
    techVersion: getNodeVersion(),
    sdkCode: "T",
    sdkSemver: packageVersion.split("-")[0],
    product: "A",
    osType: "Z",
    osVersion: "0.0",
    responsive: false,
    placeholder: false,
    lazyload: false,
    accessibility: false
  };
  if (!trackedAnalytics) {
    return defaults;
  } else {
    return Object.assign(Object.assign({}, defaults), trackedAnalytics);
  }
}
function getSDKAnalyticsSignature(_trackedAnalytics) {
  const trackedAnalytics = ensureShapeOfTrackedProperties(_trackedAnalytics);
  const analyticsOptions = getAnalyticsOptions(trackedAnalytics);
  try {
    const twoPartVersion = removePatchFromSemver(analyticsOptions.techVersion);
    const encodedSDKVersion = encodeVersion(analyticsOptions.sdkSemver);
    const encodedTechVersion = encodeVersion(twoPartVersion);
    const encodedOSVersion = encodeOSVersion(analyticsOptions.osVersion);
    const featureCode = analyticsOptions.feature;
    const SDKCode = analyticsOptions.sdkCode;
    const { product, osType } = analyticsOptions;
    const algoVersion = "D";
    return `${algoVersion}${product}${SDKCode}${encodedSDKVersion}${encodedTechVersion}${osType}${encodedOSVersion}${featureCode}`;
  } catch (e) {
    return "E";
  }
}
function removePatchFromSemver(semVerStr) {
  const parts = semVerStr.split(".");
  return `${parts[0]}.${parts[1]}`;
}
const SEO_TYPES = {
  "image/upload": "images",
  "image/private": "private_images",
  "image/authenticated": "authenticated_images",
  "raw/upload": "files",
  "video/upload": "videos"
};
class CloudinaryFile {
  constructor(publicID, cloudConfig = {}, urlConfig) {
    this.setPublicID(publicID);
    this.setCloudConfig(cloudConfig);
    this.setURLConfig(urlConfig);
  }
  /**
   * @description Sets the URL Config for this asset
   * @param urlConfig
   * @return {this}
   */
  setURLConfig(urlConfig) {
    this.urlConfig = new URLConfig(urlConfig);
    return this;
  }
  /**
   * @description Sets the Cloud Config for this asset
   * @param urlConfig
   * @return {this}
   */
  setCloudConfig(cloudConfig) {
    this.cloudName = cloudConfig.cloudName;
    this.apiKey = cloudConfig.apiKey;
    this.apiSecret = cloudConfig.apiSecret;
    this.authToken = cloudConfig.authToken;
    return this;
  }
  /**
   * @description Sets the public ID of the asset.
   * @param {string} publicID The public ID of the asset.
   * @return {this}
   */
  setPublicID(publicID) {
    this.publicID = publicID ? publicID.toString() : "";
    return this;
  }
  /**
   * @description Sets the delivery type of the asset.
   * @param {DELIVERY_TYPE | string} newType The type of the asset.
   * @return {this}
   */
  setDeliveryType(newType) {
    this.deliveryType = newType;
    return this;
  }
  /**
   * @description Sets the URL SEO suffix of the asset.
   * @param {string} newSuffix The SEO suffix.
   * @return {this}
   */
  setSuffix(newSuffix) {
    this.suffix = newSuffix;
    return this;
  }
  /**
   * @description Sets the signature of the asset.
   * @param {string} signature The signature.
   * @return {this}
   */
  setSignature(signature) {
    this.signature = signature;
    return this;
  }
  /**
   * @description Sets the version of the asset.
   * @param {string} newVersion The version of the asset.
   * @return {this}
   */
  setVersion(newVersion) {
    if (newVersion) {
      this.version = newVersion;
    }
    return this;
  }
  /**
   * @description Sets the asset type.
   * @param {string} newType The type of the asset.
   * @return {this}
   */
  setAssetType(newType) {
    if (newType) {
      this.assetType = newType;
    }
    return this;
  }
  sign() {
    return this;
  }
  /**
   * @description Serializes to URL string
   * @param overwriteOptions
   */
  toURL(overwriteOptions = {}) {
    return this.createCloudinaryURL(null, overwriteOptions.trackedAnalytics);
  }
  /**
   * @description Validate various options before attempting to create a URL
   * The function will throw in case a violation
   * @throws Validation errors
   */
  validateAssetForURLCreation() {
    if (typeof this.cloudName === "undefined") {
      throw "You must supply a cloudName when initializing the asset";
    }
    const suffixContainsDot = this.suffix && this.suffix.indexOf(".") >= 0;
    const suffixContainsSlash = this.suffix && this.suffix.indexOf("/") >= 0;
    if (suffixContainsDot || suffixContainsSlash) {
      throw "`suffix`` should not include . or /";
    }
  }
  /**
   * @description return an SEO friendly name for a combination of asset/delivery, some examples:
   * * image/upload -> images
   * * video/upload -> videos
   * If no match is found, return `{asset}/{delivery}`
   */
  getResourceType() {
    const assetType = handleAssetType(this.assetType);
    const deliveryType = handleDeliveryType(this.deliveryType);
    const hasSuffix = !!this.suffix;
    const regularSEOType = `${assetType}/${deliveryType}`;
    const shortSEOType = SEO_TYPES[`${assetType}/${deliveryType}`];
    const useRootPath = this.urlConfig.useRootPath;
    const shorten = this.urlConfig.shorten;
    if (useRootPath) {
      if (regularSEOType === "image/upload") {
        return "";
      } else {
        throw new Error(`useRootPath can only be used with assetType: 'image' and deliveryType: 'upload'. Provided: ${regularSEOType} instead`);
      }
    }
    if (shorten && regularSEOType === "image/upload") {
      return "iu";
    }
    if (hasSuffix) {
      if (shortSEOType) {
        return shortSEOType;
      } else {
        throw new Error(`URL Suffix only supported for ${Object.keys(SEO_TYPES).join(", ")}, Provided: ${regularSEOType} instead`);
      }
    }
    return regularSEOType;
  }
  getSignature() {
    if (this.signature) {
      return `s--${this.signature}--`;
    } else {
      return "";
    }
  }
  /**
   *
   * @description Creates a fully qualified CloudinaryURL
   * @return {string} CloudinaryURL
   * @throws Validation Errors
   */
  createCloudinaryURL(transformation, trackedAnalytics) {
    if (!this.publicID) {
      return "";
    }
    this.validateAssetForURLCreation();
    const prefix = getUrlPrefix(this.cloudName, this.urlConfig);
    const transformationString = transformation ? transformation.toString() : "";
    const version2 = getUrlVersion(this.publicID, this.version, this.urlConfig.forceVersion);
    const publicID = this.publicID;
    if (typeof transformation === "string") {
      const url = [prefix, this.getResourceType(), this.getSignature(), transformationString, version2, publicID.replace(/,/g, "%2C"), this.suffix].filter((a2) => a2).join("/");
      return url;
    } else {
      const safeURL = [
        encodeURI(prefix),
        this.getResourceType(),
        this.getSignature(),
        encodeURI(transformationString),
        version2,
        encodeURI(publicID).replace(/,/g, "%2C"),
        this.suffix && encodeURI(this.suffix)
      ].filter((a2) => a2).join("/").replace(/\?/g, "%3F").replace(/=/g, "%3D");
      const shouldAddAnalytics = this.urlConfig.analytics !== false && !publicID.includes("?");
      let queryParamsString = "";
      if (typeof this.urlConfig.queryParams === "object") {
        try {
          const queryParams = new URLSearchParams(this.urlConfig.queryParams);
          if (shouldAddAnalytics) {
            queryParams.set("_a", getSDKAnalyticsSignature(trackedAnalytics));
          }
          queryParamsString = queryParams.toString();
        } catch (err) {
          console.error("Error: URLSearchParams is not available so the queryParams object cannot be parsed, please try passing as an already parsed string");
        }
      } else {
        queryParamsString = this.urlConfig.queryParams || "";
        if (shouldAddAnalytics) {
          queryParamsString += `${queryParamsString.length > 0 ? "&" : ""}_a=${getSDKAnalyticsSignature(trackedAnalytics)}`;
        }
      }
      if (queryParamsString) {
        return `${safeURL}?${queryParamsString}`;
      } else {
        return safeURL;
      }
    }
  }
}
class CloudinaryTransformable extends CloudinaryFile {
  constructor(publicID, cloudConfig, urlConfig, transformation) {
    super(publicID, cloudConfig, urlConfig);
    this.transformation = transformation;
  }
  /**
   * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
   * @param {Actions.Animated} animated
   * @return {this}
   */
  animated(animated) {
    this.transformation.animated(animated);
    return this;
  }
  /**
   * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
   * @param {Actions.Border} border
   * @return {this}
   */
  border(border) {
    this.transformation.border(border);
    return this;
  }
  /**
   * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
   * @param {Actions.Reshape} reshape
   * @return {this}
   */
  reshape(reshape) {
    this.transformation.reshape(reshape);
    return this;
  }
  /**
   * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
   * @param {Actions.Resize} resize
   * @return {this}
   */
  resize(resize) {
    this.transformation.resize(resize);
    return this;
  }
  /**
   * @desc An alias to Action Delivery.quality
   * @param {string|number} quality
   * @return {this}
   */
  quality(quality) {
    this.addAction(new DeliveryFormatAction("q", quality));
    return this;
  }
  /**
   * @desc An alias to Action Delivery.format
   * @param {string} format
   * @return {this}
   */
  format(format) {
    this.addAction(new DeliveryFormatAction("f", format));
    return this;
  }
  /**
   * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
   * @param {Actions.RoundCorners} roundCorners
   * @return {this}
   */
  roundCorners(roundCorners) {
    this.transformation.roundCorners(roundCorners);
    return this;
  }
  /**
   * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
   * @return {this}
   */
  overlay(overlayAction) {
    this.transformation.overlay(overlayAction);
    return this;
  }
  /**
   * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
   * @param {Actions.Variable} variableAction
   * @return {this}
   */
  addVariable(variableAction) {
    this.transformation.addVariable(variableAction);
    return this;
  }
  /**
   * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
   * @param {Actions.Condition} conditionalAction
   * @return {this}
   */
  conditional(conditionalAction) {
    this.transformation.conditional(conditionalAction);
    return this;
  }
  /**
   * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
   * @param {Actions.Effect} effect
   * @return {this}
   */
  effect(effect) {
    this.transformation.effect(effect);
    return this;
  }
  /**
   * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
   * @param {Actions.Adjust} action
   * @return {this}
   */
  adjust(action) {
    this.transformation.adjust(action);
    return this;
  }
  /**
   * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
   * @param {Actions.Rotate} rotate
   * @return {this}
   */
  rotate(rotate) {
    this.transformation.rotate(rotate);
    return this;
  }
  /**
   * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
   * @param {Actions.NamedTransformation} namedTransformation
   * @return {this}
   */
  namedTransformation(namedTransformation) {
    this.transformation.namedTransformation(namedTransformation);
    return this;
  }
  /**
   * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
   * @param {Actions.Delivery} deliveryAction
   * @return {this}
   */
  delivery(deliveryAction) {
    this.transformation.delivery(deliveryAction);
    return this;
  }
  /**
   * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
   * @param {Qualifiers.color} color
   * @return {this}
   */
  backgroundColor(color) {
    this.transformation.backgroundColor(color);
    return this;
  }
  /**
   * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
   * @param {Actions.PSDTools} action
   * @return {this}
   */
  psdTools(action) {
    this.transformation.psdTools(action);
    return this;
  }
  /**
   * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
   * @param {Actions.Extract} action
   * @return {this}
   */
  extract(action) {
    this.transformation.extract(action);
    return this;
  }
  /**
   * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
   * @param {Qualifiers.Flag | string} flagQualifier
   * @return {this}
   */
  addFlag(flagQualifier) {
    this.transformation.addFlag(flagQualifier);
    return this;
  }
  /**
   * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
   * @param {Actions.CustomFunction} customFunction
   * @return {this}
   */
  customFunction(customFunction) {
    this.transformation.customFunction(customFunction);
    return this;
  }
  /**
   * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
   * @param {SDK.Action | string} action
   * @return {this}
   */
  addAction(action) {
    this.transformation.addAction(action);
    return this;
  }
  /**
   * @description Extend your transformation with another transformation
   * @param { string | SDK.Transformation } tx
   */
  addTransformation(tx) {
    this.transformation.addTransformation(tx);
    return this;
  }
  /**
   * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
   * @return {string}
   */
  toString() {
    return this.transformation.toString();
  }
  /**
   * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
   * @return {this}
   */
  underlay(underlayAction) {
    this.transformation.underlay(underlayAction);
    return this;
  }
  toURL(overwriteOptions = {}) {
    return this.createCloudinaryURL(this.transformation, overwriteOptions === null || overwriteOptions === void 0 ? void 0 : overwriteOptions.trackedAnalytics);
  }
}
class CloudinaryImage extends CloudinaryTransformable {
  constructor(publicID, cloudConfig, urlConfig) {
    super(publicID, cloudConfig, urlConfig, new ImageTransformation());
  }
}
class CloudinaryVideo extends CloudinaryTransformable {
  constructor(publicID, cloudConfig, urlConfig) {
    super(publicID, cloudConfig, urlConfig, new VideoTransformation());
    this.assetType = "video";
  }
  /**
   * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
   * @param {Actions.Transcode} action
   * @return {this}
   */
  transcode(action) {
    this.transformation.transcode(action);
    return this;
  }
  /**
   * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
   * @param {Actions.VideoEdit} action
   * @return {this}
   */
  videoEdit(action) {
    this.transformation.videoEdit(action);
    return this;
  }
}
class Cloudinary {
  constructor(cloudinaryConfig) {
    if (cloudinaryConfig) {
      this.cloudinaryConfig = cloudinaryConfig;
    }
  }
  image(publicID) {
    return new CloudinaryImage(publicID, this.cloudinaryConfig.cloud, this.cloudinaryConfig.url);
  }
  video(publicID) {
    return new CloudinaryVideo(publicID, this.cloudinaryConfig.cloud, this.cloudinaryConfig.url);
  }
  setConfig(cloudinaryConfig) {
    this.cloudinaryConfig = cloudinaryConfig;
    return this;
  }
  getConfig() {
    return this.cloudinaryConfig;
  }
  extendConfig() {
  }
}
var REGEX_VERSION = /\/v\d+\//;
var REGEX_FORMAT = /\.(ai|avif|gif|png|webp|bmp|bw|djvu|dng|ps|ept|eps|eps3|fbx|flif|gif|glb|gltf|heif|heic|ico|indd|jpg|jpe|jpeg|jp2|wdp|jxr|hdp|obj|pdf|ply|png|psd|arw|cr2|svg|tga|tif|tiff|u3ma|usdz|webp|3g2|3gp|avi|flv|m3u8|ts|m2ts|mts|mov|mkv|mp4|mpeg|mpd|mxf|ogv|webm|wmv)$/i;
var REGEX_URL = /https?:\/\/(?<host>[^\/]+)\/(?<cloudName>[^\/]+)\/(?<assetType>image|images|video|videos|raw|files)\/(?<deliveryType>upload|fetch|private|authenticated|sprite|facebook|twitter|youtube|vimeo)?\/?(?<signature>s--([a-zA-Z0-9\_\-]{8}|[a-zA-Z0-9\_\-]{32})--)?\/?(?<transformations>(?:[^_\/]+_[^,\/]+,?\/?)*\/)*(?<version>v\d+|\w{1,2})\/(?<publicId>[^\s]+)$/;
var ASSET_TYPES_SEO = ["images", "videos", "files"];
function parseUrl(src) {
  var _a, _b, _c, _d;
  if (typeof src !== "string") {
    throw new Error(`Failed to parse URL: Invalid src of type ${typeof src}`);
  }
  const hasVersion = REGEX_VERSION.test(src);
  if (!hasVersion) {
    throw new Error(`Invalid src: Does not include version (Ex: /v1234/)`);
  }
  const [baseUrlWithExtension, queryString] = src.split("?");
  const format = getFormat(baseUrlWithExtension);
  let baseUrl = baseUrlWithExtension;
  if (format) {
    baseUrl = baseUrlWithExtension.replace(new RegExp(`${format}$`), "");
  }
  const results = baseUrl.match(REGEX_URL);
  const transformations = (_b = (_a = results == null ? void 0 : results.groups) == null ? void 0 : _a.transformations) == null ? void 0 : _b.split("/").filter((t) => !!t);
  const parts = {
    ...results == null ? void 0 : results.groups,
    format,
    seoSuffix: void 0,
    transformations: transformations || [],
    queryParams: {},
    version: ((_c = results == null ? void 0 : results.groups) == null ? void 0 : _c.version) ? parseInt(results.groups.version.replace("v", "")) : void 0
  };
  if (queryString) {
    parts.queryParams = queryString.split("&").reduce((prev, curr) => {
      const [key, value] = curr.split("=");
      prev[key] = value;
      return prev;
    }, {});
  }
  if (parts.assetType && ASSET_TYPES_SEO.includes(parts.assetType)) {
    const publicIdParts = ((_d = parts.publicId) == null ? void 0 : _d.split("/")) || [];
    parts.seoSuffix = publicIdParts.pop();
    parts.publicId = publicIdParts.join("/");
  }
  if (parts.publicId) {
    parts.publicId = decodeURIComponent(parts.publicId);
  }
  return parts;
}
function getFormat(src) {
  const matches = src.match(REGEX_FORMAT);
  if (matches === null)
    return;
  return matches[0];
}
function testColorIsHex(value) {
  if (typeof value !== "string")
    return false;
  return !!value.startsWith("#");
}
function convertColorHexToRgb(value) {
  return `rgb:${value.replace("#", "")}`;
}
function encodeBase64(value) {
  if (typeof btoa === "function") {
    return btoa(value);
  }
  if (typeof Buffer !== "undefined") {
    return Buffer.from(value).toString("base64");
  }
}
function objectHasKey(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}
function sortByKey(array = [], key, type2 = "asc") {
  function compare(a2, b) {
    let keyA = a2[key];
    let keyB = b[key];
    if (typeof keyA === "string") {
      keyA = keyA.toLowerCase();
    }
    if (typeof keyB === "string") {
      keyB = keyB.toLowerCase();
    }
    if (keyA < keyB) {
      return -1;
    }
    if (keyA > keyB) {
      return 1;
    }
    return 0;
  }
  let newArray = [...array];
  if (typeof key !== "string")
    return newArray;
  newArray = newArray.sort(compare);
  if (type2 === "desc") {
    return newArray.reverse();
  }
  return newArray;
}
var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name2 in all)
    __defProp(target, name2, { get: all[name2], enumerable: true });
};
var cropping_exports = {};
__export(cropping_exports, {
  assetTypes: () => assetTypes,
  normalizeNumberParameter: () => normalizeNumberParameter,
  plugin: () => plugin,
  props: () => props
});
var cropsAspectRatio = ["crop", "fill", "lfill", "fill_pad", "thumb"];
var cropsGravityAuto = ["crop", "fill", "lfill", "fill_pad", "thumb"];
var cropsWithZoom = ["crop", "thumb"];
var props = [
  "aspectRatio",
  "crop",
  "gravity",
  "zoom"
];
var assetTypes = ["image", "images", "video", "videos"];
function normalizeNumberParameter(param) {
  if (typeof param !== "string")
    return param;
  return parseInt(param);
}
function plugin(props17) {
  const { cldAsset, options } = props17;
  const {
    aspectRatio,
    width: defaultWidth,
    height: defaultHeight,
    widthResize: defaultWidthResize,
    crop = "limit"
  } = options;
  const overrides = {
    width: void 0
  };
  let height = normalizeNumberParameter(defaultHeight);
  let width = normalizeNumberParameter(defaultWidth);
  let widthResize = normalizeNumberParameter(defaultWidthResize);
  const hasDefinedDimensions = height || width;
  const hasValidAspectRatio = aspectRatio && cropsAspectRatio.includes(crop);
  let transformationString = "";
  if (crop && (hasDefinedDimensions || hasValidAspectRatio)) {
    transformationString = `c_${crop}`;
  }
  if (hasValidAspectRatio) {
    transformationString = `${transformationString},ar_${aspectRatio}`;
  }
  if (width) {
    transformationString = `${transformationString},w_${width}`;
  }
  if (!options.gravity && cropsGravityAuto.includes(crop)) {
    options.gravity = "auto";
  }
  if (!["limit"].includes(crop) && typeof height === "number") {
    transformationString = `${transformationString},h_${height}`;
  }
  if (options.gravity) {
    if (options.gravity === "auto" && !cropsGravityAuto.includes(crop)) {
      console.warn(`Auto gravity can only be used with crop modes: ${cropsGravityAuto.join(", ")}. Not applying gravity.`);
    } else {
      transformationString = `${transformationString},g_${options.gravity}`;
    }
  }
  if (options.zoom) {
    if (options.zoom === "auto" && !cropsWithZoom.includes(crop)) {
      console.warn(`Zoom can only be used with crop modes: ${cropsWithZoom.join(", ")}. Not applying zoom.`);
    } else {
      transformationString = `${transformationString},z_${options.zoom}`;
    }
  }
  cldAsset.effect(transformationString);
  if (widthResize) {
    overrides.width = widthResize;
  }
  return {
    options: overrides
  };
}
var default_image_exports = {};
__export(default_image_exports, {
  assetTypes: () => assetTypes2,
  plugin: () => plugin2,
  props: () => props2
});
var props2 = ["default"];
var assetTypes2 = ["image", "images"];
function plugin2(props17) {
  const { cldAsset, options } = props17;
  const { defaultImage } = options;
  if (typeof defaultImage === "string") {
    if (!getFormat(defaultImage)) {
      console.warn(`The defaultImage prop may be missing a format and must include it along with the public ID. (Ex: myimage.jpg)`);
    }
    const defaultImageId = defaultImage.replace(/\//g, ":");
    cldAsset.addTransformation(`d_${defaultImageId}`);
  }
  return {};
}
var effects_exports = {};
__export(effects_exports, {
  assetTypes: () => assetTypes3,
  plugin: () => plugin3,
  props: () => props3
});
var convertersColors = [
  {
    test: testColorIsHex,
    convert: convertColorHexToRgb
  }
];
var primary = {
  aspectRatio: {
    qualifier: "ar"
  },
  crop: {
    qualifier: "c"
  },
  gravity: {
    qualifier: "g"
  },
  height: {
    qualifier: "h"
  },
  width: {
    qualifier: "w"
  }
};
var position = {
  angle: {
    qualifier: "a"
  },
  gravity: {
    qualifier: "g"
  },
  x: {
    qualifier: "x"
  },
  y: {
    qualifier: "y"
  }
};
var text = {
  alignment: {
    qualifier: false,
    order: 6
  },
  antialias: {
    qualifier: "antialias"
  },
  border: {
    qualifier: "bo",
    location: "primary"
  },
  color: {
    qualifier: "co",
    location: "primary",
    converters: convertersColors
  },
  fontFamily: {
    qualifier: false,
    order: 1
  },
  fontSize: {
    qualifier: false,
    order: 2
  },
  fontStyle: {
    qualifier: false,
    order: 4
  },
  fontWeight: {
    qualifier: false,
    order: 3
  },
  hinting: {
    qualifier: "hinting"
  },
  letterSpacing: {
    qualifier: "letter_spacing"
  },
  lineSpacing: {
    qualifier: "line_spacing"
  },
  stroke: {
    qualifier: "self",
    order: 7
  },
  textDecoration: {
    qualifier: false,
    order: 5
  }
};
var effects = {
  art: {
    prefix: "e",
    qualifier: "art"
  },
  autoBrightness: {
    prefix: "e",
    qualifier: "auto_brightness"
  },
  autoColor: {
    prefix: "e",
    qualifier: "auto_color"
  },
  autoContrast: {
    prefix: "e",
    qualifier: "auto_contrast"
  },
  assistColorblind: {
    prefix: "e",
    qualifier: "assist_colorblind"
  },
  background: {
    qualifier: "b"
  },
  blackwhite: {
    prefix: "e",
    qualifier: "blackwhite"
  },
  blur: {
    prefix: "e",
    qualifier: "blur"
  },
  blurFaces: {
    prefix: "e",
    qualifier: "blur_faces"
  },
  blurRegion: {
    prefix: "e",
    qualifier: "blur_region"
  },
  border: {
    qualifier: "bo"
  },
  brightness: {
    prefix: "e",
    qualifier: "brightness"
  },
  brightnessHSB: {
    prefix: "e",
    qualifier: "brightness_hsb"
  },
  cartoonify: {
    prefix: "e",
    qualifier: "cartoonify"
  },
  color: {
    qualifier: "co",
    converters: convertersColors
  },
  colorize: {
    prefix: "e",
    qualifier: "colorize"
  },
  contrast: {
    prefix: "e",
    qualifier: "contrast"
  },
  distort: {
    prefix: "e",
    qualifier: "distort"
  },
  fillLight: {
    prefix: "e",
    qualifier: "fill_light"
  },
  gamma: {
    prefix: "e",
    qualifier: "gamma"
  },
  gradientFade: {
    prefix: "e",
    qualifier: "gradient_fade"
  },
  grayscale: {
    prefix: "e",
    qualifier: "grayscale"
  },
  improve: {
    prefix: "e",
    qualifier: "improve"
  },
  multiply: {
    prefix: "e",
    qualifier: "multiply"
  },
  negate: {
    prefix: "e",
    qualifier: "negate"
  },
  oilPaint: {
    prefix: "e",
    qualifier: "oil_paint"
  },
  opacity: {
    qualifier: "o"
  },
  outline: {
    prefix: "e",
    qualifier: "outline"
  },
  overlay: {
    prefix: "e",
    qualifier: "overlay"
  },
  pixelate: {
    prefix: "e",
    qualifier: "pixelate"
  },
  pixelateFaces: {
    prefix: "e",
    qualifier: "pixelate_faces"
  },
  pixelateRegion: {
    prefix: "e",
    qualifier: "pixelate_region"
  },
  radius: {
    qualifier: "r"
  },
  redeye: {
    prefix: "e",
    qualifier: "redeye"
  },
  replaceColor: {
    prefix: "e",
    qualifier: "replace_color"
  },
  saturation: {
    prefix: "e",
    qualifier: "saturation"
  },
  screen: {
    prefix: "e",
    qualifier: "screen"
  },
  sepia: {
    prefix: "e",
    qualifier: "sepia"
  },
  shadow: {
    prefix: "e",
    qualifier: "shadow"
  },
  sharpen: {
    prefix: "e",
    qualifier: "sharpen"
  },
  shear: {
    prefix: "e",
    qualifier: "shear"
  },
  simulateColorblind: {
    prefix: "e",
    qualifier: "simulate_colorblind"
  },
  tint: {
    prefix: "e",
    qualifier: "tint"
  },
  trim: {
    prefix: "e",
    qualifier: "trim"
  },
  unsharpMask: {
    prefix: "e",
    qualifier: "unsharp_mask"
  },
  vectorize: {
    prefix: "e",
    qualifier: "vectorize"
  },
  vibrance: {
    prefix: "e",
    qualifier: "vibrance"
  },
  vignette: {
    prefix: "e",
    qualifier: "vignette"
  }
};
var flags = {
  animated: {
    prefix: "fl",
    qualifier: "animated"
  },
  anyFormat: {
    prefix: "fl",
    qualifier: "any_format"
  },
  apng: {
    prefix: "fl",
    qualifier: "apng"
  },
  attachment: {
    prefix: "fl",
    qualifier: "attachment"
  },
  awebp: {
    prefix: "fl",
    qualifier: "awebp"
  },
  clip: {
    prefix: "fl",
    qualifier: "clip"
  },
  clipEvenodd: {
    prefix: "fl",
    qualifier: "clip_evenodd"
  },
  cutter: {
    prefix: "fl",
    qualifier: "cutter"
  },
  draco: {
    prefix: "fl",
    qualifier: "draco"
  },
  forceIcc: {
    prefix: "fl",
    qualifier: "force_icc"
  },
  forceStrip: {
    prefix: "fl",
    qualifier: "force_strip"
  },
  getinfo: {
    prefix: "fl",
    qualifier: "getinfo"
  },
  group4: {
    prefix: "fl",
    qualifier: "group4"
  },
  hlsv3: {
    prefix: "fl",
    qualifier: "hlsv3"
  },
  ignoreAspectRatio: {
    prefix: "fl",
    qualifier: "ignore_aspect_ratio"
  },
  ignoreMaskChannels: {
    prefix: "fl",
    qualifier: "ignore_mask_channels"
  },
  immutableCache: {
    prefix: "fl",
    qualifier: "immutable_cache"
  },
  keepAttribution: {
    prefix: "fl",
    qualifier: "keep_attribution"
  },
  keepDar: {
    prefix: "fl",
    qualifier: "keep_dar"
  },
  keepIptc: {
    prefix: "fl",
    qualifier: "keep_iptc"
  },
  layerApply: {
    prefix: "fl",
    qualifier: "layer_apply"
  },
  lossy: {
    prefix: "fl",
    qualifier: "lossy"
  },
  mono: {
    prefix: "fl",
    qualifier: "mono"
  },
  noOverflow: {
    prefix: "fl",
    qualifier: "no_overflow"
  },
  noStream: {
    prefix: "fl",
    qualifier: "no_stream"
  },
  png8: {
    prefix: "fl",
    qualifier: "png8"
  },
  png24: {
    prefix: "fl",
    qualifier: "png24"
  },
  png32: {
    prefix: "fl",
    qualifier: "png32"
  },
  preserveTransparency: {
    prefix: "fl",
    qualifier: "preserve_transparency"
  },
  progressive: {
    prefix: "fl",
    qualifier: "progressive"
  },
  rasterize: {
    prefix: "fl",
    qualifier: "rasterize"
  },
  regionRelative: {
    prefix: "fl",
    qualifier: "region_relative"
  },
  relative: {
    prefix: "fl",
    qualifier: "relative",
    location: "primary"
  },
  replaceImage: {
    prefix: "fl",
    qualifier: "replace_image"
  },
  sanitize: {
    prefix: "fl",
    qualifier: "sanitize"
  },
  splice: {
    prefix: "fl",
    qualifier: "splice"
  },
  streamingAttachment: {
    prefix: "fl",
    qualifier: "streaming_attachment"
  },
  stripProfile: {
    prefix: "fl",
    qualifier: "strip_profile"
  },
  textDisallowOverflow: {
    prefix: "fl",
    qualifier: "text_disallow_overflow"
  },
  textNoTrim: {
    prefix: "fl",
    qualifier: "text_no_trim"
  },
  tif8Lzw: {
    prefix: "fl",
    qualifier: "tif8_lzw"
  },
  tiled: {
    prefix: "fl",
    qualifier: "tiled"
  },
  truncateTs: {
    prefix: "fl",
    qualifier: "truncate_ts"
  },
  waveform: {
    prefix: "fl",
    qualifier: "waveform"
  }
};
var video = {
  streamingProfile: {
    qualifier: "sp",
    location: "primary"
  }
};
function constructTransformation({ prefix, qualifier, value, converters }) {
  let transformation = "";
  if (prefix) {
    transformation = `${prefix}_`;
  }
  let transformationValue = value;
  converters == null ? void 0 : converters.forEach(({ test, convert }) => {
    if (!test(transformationValue))
      return;
    transformationValue = convert(transformationValue);
  });
  if (transformationValue === true || transformationValue === "true") {
    return `${transformation}${qualifier}`;
  }
  if (typeof transformationValue === "string" || typeof transformationValue === "number") {
    if (prefix) {
      return `${transformation}${qualifier}:${transformationValue}`;
    } else {
      return `${qualifier}_${transformationValue}`;
    }
  }
}
var props3 = [...Object.keys(effects), "effects"];
var assetTypes3 = ["image", "images", "video", "videos"];
function plugin3(props17) {
  const { cldAsset, options } = props17;
  const transformationStrings = constructTransformationString({
    effects,
    options
  });
  transformationStrings.filter((t) => !!t).forEach((transformation) => cldAsset.effect(transformation));
  if (Array.isArray(options == null ? void 0 : options.effects)) {
    options == null ? void 0 : options.effects.forEach((effectsSet) => {
      const transformationString = constructTransformationString({
        effects,
        options: effectsSet
      }).filter((t) => !!t).join(",");
      cldAsset.effect(transformationString);
    });
  }
  function constructTransformationString({ effects: effects2, options: options2 }) {
    return Object.keys(effects2).map((key) => {
      const { prefix, qualifier, converters } = effects2[key];
      return constructTransformation({
        qualifier,
        prefix,
        value: options2 == null ? void 0 : options2[key],
        converters
      });
    });
  }
  return {};
}
var flags_exports = {};
__export(flags_exports, {
  assetTypes: () => assetTypes4,
  plugin: () => plugin4,
  props: () => props4
});
var props4 = ["flags"];
var assetTypes4 = ["image", "images", "video", "videos"];
var supportedFlags = Object.entries(flags).map(([_, { qualifier }]) => qualifier);
function plugin4(props17) {
  const { cldAsset, options } = props17;
  const { flags: flags2 = [] } = options;
  if (Array.isArray(flags2) && flags2.length > 0) {
    flags2.forEach((flag) => {
      if (!supportedFlags.includes(flag))
        return;
      cldAsset.addFlag(flag);
    });
  } else if (typeof flags2 === "object") {
    Object.entries(flags2).forEach(([qualifier, value]) => {
      if (!supportedFlags.includes(qualifier))
        return;
      cldAsset.addTransformation(`fl_${qualifier}:${value}`);
    });
  }
  return {};
}
var fill_background_exports = {};
__export(fill_background_exports, {
  assetTypes: () => assetTypes5,
  plugin: () => plugin5,
  props: () => props5
});
var props5 = ["fillBackground"];
var assetTypes5 = ["image", "images"];
var defaultCrop = "pad";
function plugin5(props17) {
  const { cldAsset, options } = props17;
  const { fillBackground } = options;
  if (fillBackground === true) {
    const properties = [
      "b_gen_fill",
      `ar_${options.width}:${options.height}`,
      `w_${options.width}`,
      `c_${defaultCrop}`
    ];
    cldAsset.addTransformation(properties.join(","));
  } else if (typeof fillBackground === "object") {
    const { crop = defaultCrop, gravity, prompt } = fillBackground;
    const properties = [
      `ar_${options.width}:${options.height}`,
      `w_${options.width}`,
      `c_${crop}`
    ];
    if (typeof prompt === "string") {
      properties.unshift(`b_gen_fill:${prompt}`);
    } else {
      properties.unshift(`b_gen_fill`);
    }
    if (typeof gravity === "string") {
      properties.push(`g_${gravity}`);
    }
    cldAsset.addTransformation(properties.join(","));
  }
  return {};
}
var sanitize_exports = {};
__export(sanitize_exports, {
  assetTypes: () => assetTypes6,
  plugin: () => plugin6,
  props: () => props6
});
var props6 = ["sanitize"];
var assetTypes6 = ["image", "images"];
function plugin6(props17) {
  const { cldAsset, options } = props17;
  const { sanitize = true } = options;
  const shouldApplySanitizer = sanitize && (options.format === "svg" || cldAsset.publicID.endsWith(".svg"));
  if (shouldApplySanitizer) {
    cldAsset.effect("fl_sanitize");
  }
  return {};
}
var overlays_exports = {};
__export(overlays_exports, {
  DEFAULT_TEXT_OPTIONS: () => DEFAULT_TEXT_OPTIONS,
  assetTypes: () => assetTypes7,
  plugin: () => plugin7,
  props: () => props7
});
var props7 = ["text", "overlays"];
var assetTypes7 = ["image", "images", "video", "videos"];
var DEFAULT_TEXT_OPTIONS = {
  color: "black",
  fontFamily: "Arial",
  fontSize: 200,
  fontWeight: "bold"
};
function plugin7(props17) {
  const { cldAsset, options } = props17;
  const { text: text2, overlays = [] } = options;
  const type2 = "overlay";
  const typeQualifier = "l";
  if (Array.isArray(overlays)) {
    overlays.forEach(applyOverlay);
  }
  if (typeof text2 === "string") {
    applyOverlay({
      text: {
        ...DEFAULT_TEXT_OPTIONS,
        text: text2
      }
    });
  } else if (typeof text2 === "object") {
    applyOverlay({
      text: {
        ...DEFAULT_TEXT_OPTIONS,
        ...text2
      }
    });
  }
  function applyOverlay({ publicId, url, position: position2, text: text3, effects: layerEffects = [], appliedEffects = [], ...options2 }) {
    var _a;
    const hasPublicId = typeof publicId === "string";
    const hasUrl = typeof url === "string";
    const hasText = typeof text3 === "object" || typeof text3 === "string";
    const hasPosition = typeof position2 === "object";
    if (!hasPublicId && !hasUrl && !hasText) {
      console.warn(`An ${type2} is missing Public ID, URL, or Text`);
      return;
    }
    let layerTransformation;
    if (hasText) {
      layerTransformation = `${typeQualifier}_text`;
    } else if (hasPublicId) {
      layerTransformation = `${typeQualifier}_${publicId.replace(/\//g, ":")}`;
    } else if (hasUrl) {
      layerTransformation = `${typeQualifier}_fetch:${encodeBase64(url)}`;
    }
    const primary2 = [];
    const applied = [];
    Object.keys(options2).forEach((key) => {
      if (!objectHasKey(primary, key))
        return;
      const { qualifier, converters } = primary[key];
      const transformation = constructTransformation({
        qualifier,
        value: options2[key],
        converters
      });
      if (transformation) {
        primary2.push(transformation);
      }
    });
    layerEffects.forEach((effect) => {
      Object.keys(effect).forEach((key) => {
        const { qualifier, prefix, converters } = primary[key] || effects[key] || {};
        const transformation = constructTransformation({
          qualifier,
          prefix,
          value: effect[key],
          converters
        });
        if (transformation) {
          primary2.push(transformation);
        }
      });
    });
    appliedEffects.forEach((effect) => {
      Object.keys(effect).forEach((key) => {
        const { qualifier, prefix, converters } = primary[key] || effects[key] || {};
        const transformation = constructTransformation({
          qualifier,
          prefix,
          value: effect[key],
          converters
        });
        if (transformation) {
          applied.push(transformation);
        }
      });
    });
    if (hasText) {
      if (typeof text3 === "string") {
        text3 = {
          ...DEFAULT_TEXT_OPTIONS,
          text: text3
        };
      }
      const textTransformations = [];
      if (typeof text3 === "object") {
        const textOptions = Object.keys(text3).filter((key) => objectHasKey(text, key)).map((key) => {
          const value = text3 && objectHasKey(text3, key) && text3[key];
          return {
            ...text[key],
            key,
            value,
            order: text[key].order || 99
          };
        });
        const sortedTextOptions = sortByKey(textOptions, "order");
        for (const textOption of sortedTextOptions) {
          const { key, value, qualifier, location, converters } = textOption;
          let textValue = value;
          converters == null ? void 0 : converters.forEach(({ test, convert }) => {
            if (!test(value))
              return;
            textValue = convert(value);
          });
          if (location === "primary") {
            primary2.push(`${qualifier}_${textValue}`);
          } else if (qualifier === "self") {
            textTransformations.push(key);
          } else if (qualifier) {
            textTransformations.push(`${qualifier}_${textValue}`);
          } else {
            textTransformations.push(textValue);
          }
        }
      }
      const specialCharacters = {
        ".": "%2E",
        ",": "%2C",
        "/": "%2F"
      };
      let layerText = (text3 == null ? void 0 : text3.text) || "";
      if (typeof layerText === "string") {
        (_a = Object.keys(specialCharacters)) == null ? void 0 : _a.forEach((character) => {
          layerText = layerText == null ? void 0 : layerText.replace(character, specialCharacters[character]);
        });
      }
      layerTransformation = `${layerTransformation}:${textTransformations.join("_")}:${layerText}`;
    }
    if (hasPosition) {
      Object.keys(position2).forEach((key) => {
        if (!objectHasKey(position, key))
          return;
        const { qualifier, converters } = position[key];
        const transformation = constructTransformation({
          qualifier,
          value: position2[key],
          converters
        });
        if (transformation) {
          applied.push(transformation);
        }
      });
    }
    if (primary2.length > 0) {
      layerTransformation = `${layerTransformation},${primary2.join(",")}`;
    }
    layerTransformation = `${layerTransformation}/fl_layer_apply,fl_no_overflow`;
    if (applied.length > 0) {
      layerTransformation = `${layerTransformation},${applied.join(",")}`;
    }
    cldAsset.addTransformation(layerTransformation);
  }
  return {};
}
var named_transformations_exports = {};
__export(named_transformations_exports, {
  assetTypes: () => assetTypes8,
  plugin: () => plugin8,
  props: () => props8,
  strict: () => strict
});
var props8 = ["transformations"];
var assetTypes8 = ["image", "images", "video", "videos"];
var strict = true;
function plugin8(props17) {
  const { cldAsset, options } = props17;
  let { transformations = [] } = options;
  if (!Array.isArray(transformations)) {
    transformations = [transformations];
  }
  transformations.forEach((transformation) => {
    cldAsset.addTransformation(`t_${transformation}`);
  });
  return {};
}
var raw_transformations_exports = {};
__export(raw_transformations_exports, {
  assetTypes: () => assetTypes9,
  plugin: () => plugin9,
  props: () => props9
});
var props9 = ["rawTransformations"];
var assetTypes9 = ["image", "images", "video", "videos"];
function plugin9(props17) {
  const { cldAsset, options } = props17;
  const { rawTransformations = [] } = options;
  rawTransformations.forEach((transformation) => {
    cldAsset.addTransformation(transformation);
  });
  return {};
}
var remove_background_exports = {};
__export(remove_background_exports, {
  assetTypes: () => assetTypes10,
  plugin: () => plugin10,
  props: () => props10
});
var props10 = ["removeBackground"];
var assetTypes10 = ["image", "images"];
function plugin10(props17) {
  const { cldAsset, options } = props17;
  const { removeBackground = false } = options;
  if (removeBackground) {
    cldAsset.effect("e_background_removal");
  }
  return {};
}
var generative_replace_exports = {};
__export(generative_replace_exports, {
  assetTypes: () => assetTypes11,
  plugin: () => plugin11,
  props: () => props11
});
var props11 = ["replace"];
var assetTypes11 = ["image", "images"];
function plugin11(props17) {
  const { cldAsset, options } = props17;
  const { replace = null } = options;
  if (replace) {
    let from, to, preserveGeometry = false;
    if (Array.isArray(replace)) {
      from = replace[0];
      to = replace[1];
      preserveGeometry = replace[2] || false;
    } else {
      from = replace.from;
      to = replace.to;
      preserveGeometry = replace.preserveGeometry || false;
    }
    const properties = [`e_gen_replace:from_${from}`, `to_${to}`];
    if (preserveGeometry) {
      properties.push(`preserve-geometry_${preserveGeometry}`);
    }
    cldAsset.effect(properties.join(";"));
  }
  return {};
}
var seo_exports = {};
__export(seo_exports, {
  assetTypes: () => assetTypes12,
  plugin: () => plugin12,
  props: () => props12
});
var props12 = ["seoSuffix"];
var assetTypes12 = ["image", "images", "video", "videos"];
function plugin12(props17) {
  const { cldAsset, options } = props17;
  const { seoSuffix } = options;
  if (typeof seoSuffix === "string") {
    if (options.deliveryType === "fetch") {
      console.warn("SEO suffix is not supported with a delivery type of fetch");
    } else {
      cldAsset.setSuffix(seoSuffix);
    }
  }
  return {};
}
var underlays_exports = {};
__export(underlays_exports, {
  assetTypes: () => assetTypes13,
  plugin: () => plugin13,
  props: () => props13
});
var props13 = ["underlay", "underlays"];
var assetTypes13 = ["image", "images", "video", "videos"];
function plugin13(props17) {
  const { cldAsset, options } = props17;
  const { underlay, underlays = [] } = options;
  const typeQualifier = "u";
  if (Array.isArray(underlays)) {
    underlays.forEach(applyUnderlay);
  }
  if (typeof underlay === "string") {
    const underlayOptions = {
      publicId: underlay,
      crop: "fill",
      width: "1.0",
      height: "1.0",
      flags: ["relative"]
    };
    applyUnderlay(underlayOptions);
  }
  function applyUnderlay({ publicId, type: type2, position: position2, effects: layerEffects = [], flags: flags2 = [], ...options2 }) {
    const hasPublicId = typeof publicId === "string";
    const hasPosition = typeof position2 === "object";
    if (!hasPublicId) {
      console.warn(`An ${type2} is missing a Public ID`);
      return;
    }
    let layerTransformation = `${typeQualifier}_${publicId.replace(/\//g, ":")}`;
    const primary2 = [];
    const applied = [];
    Object.keys(options2).forEach((key) => {
      if (!objectHasKey(primary, key))
        return;
      const { qualifier } = primary[key];
      primary2.push(`${qualifier}_${options2[key]}`);
    });
    layerEffects.forEach((effect) => {
      Object.keys(effect).forEach((key) => {
        if (!objectHasKey(primary, key))
          return;
        const { qualifier } = primary[key];
        primary2.push(`${qualifier}_${effect[key]}`);
      });
    });
    if (hasPosition) {
      Object.keys(position2).forEach((key) => {
        if (!objectHasKey(position, key))
          return;
        const { qualifier } = position[key];
        applied.push(`${qualifier}_${position2[key]}`);
      });
    }
    flags2.forEach((key) => {
      if (!objectHasKey(flags, key))
        return;
      const { qualifier, prefix } = flags[key];
      primary2.push(`${prefix}_${qualifier}`);
    });
    layerTransformation = `${layerTransformation},${primary2.join(",")}`;
    layerTransformation = `${layerTransformation}/fl_layer_apply,fl_no_overflow`;
    if (applied.length > 0) {
      layerTransformation = `${layerTransformation},${applied.join(",")}`;
    }
    cldAsset.addTransformation(layerTransformation);
  }
  return {};
}
var version_exports = {};
__export(version_exports, {
  assetTypes: () => assetTypes14,
  plugin: () => plugin14,
  props: () => props14
});
var props14 = ["version"];
var assetTypes14 = ["image", "images", "video", "videos"];
function plugin14(props17) {
  const { cldAsset, options } = props17;
  const { version: version2 } = options;
  if (typeof version2 === "string" || typeof version2 === "number") {
    cldAsset.setVersion(`${version2}`.replace("v", ""));
  }
  return {};
}
var video_exports = {};
__export(video_exports, {
  assetTypes: () => assetTypes15,
  plugin: () => plugin15,
  props: () => props15
});
var props15 = [...Object.keys(video)];
var assetTypes15 = ["video", "videos"];
function plugin15(props17) {
  const { cldAsset, options } = props17;
  Object.keys(options).forEach((key) => {
    if (!objectHasKey(video, key))
      return;
    const { prefix, qualifier, converters } = video[key];
    const transformation = constructTransformation({
      prefix,
      qualifier,
      value: options[key],
      converters
    });
    cldAsset.addTransformation(transformation);
  });
  return {};
}
var zoompan_exports = {};
__export(zoompan_exports, {
  assetTypes: () => assetTypes16,
  plugin: () => plugin16,
  props: () => props16
});
var props16 = ["zoompan"];
var assetTypes16 = ["image", "images"];
function plugin16(props17) {
  const { cldAsset, options } = props17;
  const { zoompan = false } = options;
  const overrides = {
    format: void 0
  };
  if (zoompan === true) {
    cldAsset.effect("e_zoompan");
  } else if (typeof zoompan === "string") {
    if (zoompan === "loop") {
      cldAsset.effect("e_zoompan");
      cldAsset.effect("e_loop");
    } else {
      cldAsset.effect(`e_zoompan:${zoompan}`);
    }
  } else if (typeof zoompan === "object") {
    let zoompanEffect = "e_zoompan";
    if (typeof zoompan.options === "string") {
      zoompanEffect = `${zoompanEffect}${zoompan.options}`;
    }
    cldAsset.effect(zoompanEffect);
    let loopEffect;
    if (zoompan.loop === true) {
      loopEffect = "e_loop";
    } else if (typeof zoompan.loop === "string") {
      loopEffect = `e_loop${zoompan.loop}`;
    }
    if (loopEffect) {
      cldAsset.effect(loopEffect);
    }
  }
  if (zoompan !== false) {
    overrides.format = "gif";
  }
  return {
    options: overrides
  };
}
var transformationPlugins = [
  generative_replace_exports,
  remove_background_exports,
  raw_transformations_exports,
  cropping_exports,
  default_image_exports,
  effects_exports,
  fill_background_exports,
  flags_exports,
  overlays_exports,
  sanitize_exports,
  named_transformations_exports,
  seo_exports,
  underlays_exports,
  version_exports,
  video_exports,
  zoompan_exports
];
function constructCloudinaryUrl({ options, config, analytics }) {
  const cld = new Cloudinary(config);
  if (typeof (options == null ? void 0 : options.src) !== "string") {
    throw Error(`Failed to construct Cloudinary URL: Missing source (src) in options`);
  }
  if (!(options == null ? void 0 : options.assetType)) {
    options.assetType = "image";
  }
  const propsCheck = [];
  transformationPlugins.forEach(({ props: props17 = [] }) => {
    props17.forEach((prop) => {
      if (propsCheck.includes(prop)) {
        throw new Error(`Option ${prop} already exists!`);
      }
      propsCheck.push(prop);
    });
  });
  const parsedOptions = {};
  let publicId;
  if (typeof options.src === "string" && /^https?:\/\//.test(options.src)) {
    try {
      const parts = parseUrl(options.src);
      publicId = parts == null ? void 0 : parts.publicId;
      parsedOptions.seoSuffix = parts == null ? void 0 : parts.seoSuffix;
      parsedOptions.version = parts == null ? void 0 : parts.version;
    } catch (e) {
    }
  }
  if (!publicId) {
    publicId = options.src;
  }
  Object.keys(parsedOptions).forEach((key) => {
    if (objectHasKey(options, key))
      return;
    options[key] = parsedOptions[key];
  });
  let cldAsset = void 0;
  if (["image", "images"].includes(options.assetType)) {
    cldAsset = cld.image(publicId);
  } else if (["video", "videos"].includes(options.assetType)) {
    cldAsset = cld.video(publicId);
  }
  if (typeof cldAsset === "undefined") {
    throw new Error("Invalid asset type.");
  }
  transformationPlugins.forEach(({ plugin: plugin17, assetTypes: assetTypes17, props: props17, strict: strict2 }) => {
    const supportedAssetType = typeof (options == null ? void 0 : options.assetType) !== "undefined" && assetTypes17.includes(options == null ? void 0 : options.assetType);
    const optionsKeys = Object.keys(options);
    const attemptedUse = props17.map((prop) => optionsKeys.includes(prop)).filter((isUsed) => !!isUsed).length > 0;
    if (!supportedAssetType) {
      if (attemptedUse) {
        console.warn(`One of the following props [${props17.join(", ")}] was used with an unsupported asset type [${options == null ? void 0 : options.assetType}]`);
      }
      return;
    }
    if (options.strictTransformations && !strict2) {
      if (attemptedUse) {
        console.warn(`One of the following props [${props17.join(", ")}] was used that is not supported with Strict Transformations.`);
      }
      return;
    }
    const results = plugin17({
      cldAsset,
      options
    });
    const { options: pluginOptions } = results || { options: void 0 };
    if ((pluginOptions == null ? void 0 : pluginOptions.format) && options) {
      options.format = pluginOptions.format;
    }
    if ((pluginOptions == null ? void 0 : pluginOptions.width) && options) {
      options.resize = {
        width: pluginOptions == null ? void 0 : pluginOptions.width
      };
    }
  });
  if ((options == null ? void 0 : options.resize) && !options.strictTransformations) {
    const { width, crop = "limit" } = options.resize;
    cldAsset.effect(`c_${crop},w_${width}`);
  }
  cldAsset.setDeliveryType((options == null ? void 0 : options.deliveryType) || "upload");
  if (!options.strictTransformations) {
    if (options == null ? void 0 : options.dpr) {
      let dpr = options.dpr;
      if (typeof dpr === "number") {
        dpr = dpr.toFixed(1);
      }
      cldAsset.addTransformation(`dpr_${dpr}`);
    }
    if ((options == null ? void 0 : options.format) !== "default") {
      cldAsset.format((options == null ? void 0 : options.format) || "auto");
    }
    if ((options == null ? void 0 : options.quality) !== "default") {
      cldAsset.quality((options == null ? void 0 : options.quality) || "auto");
    }
  }
  return cldAsset.toURL({
    trackedAnalytics: analytics
  });
}
const domains = {
  "images.ctfassets.net": "contentful",
  "cdn.builder.io": "builder.io",
  "images.prismic.io": "imgix",
  "www.datocms-assets.com": "imgix",
  "cdn.sanity.io": "imgix",
  "images.unsplash.com": "imgix",
  "cdn.shopify.com": "shopify",
  "s7d1.scene7.com": "scene7",
  "ip.keycdn.com": "keycdn",
  "assets.caisy.io": "bunny",
  "images.contentstack.io": "contentstack"
};
const subdomains = {
  "imgix.net": "imgix",
  "files.wordpress.com": "wordpress",
  "b-cdn.net": "bunny",
  "storyblok.com": "storyblok",
  "kc-usercontent.com": "kontent.ai",
  "cloudinary.com": "cloudinary",
  "kxcdn.com": "keycdn",
  "imgeng.in": "imageengine",
  "imagekit.io": "imagekit",
  "cloudimg.io": "cloudimage"
};
const paths = {
  "/cdn-cgi/image/": "cloudflare",
  "/cdn-cgi/imagedelivery/": "cloudflare_images",
  "/_next/image": "nextjs",
  "/_next/static": "nextjs",
  "/_vercel/image": "vercel",
  "/is/image": "scene7",
  "/_ipx/": "ipx",
  "/_image": "astro",
  "/.netlify/images": "netlify"
};
const roundIfNumeric = (value) => {
  if (!value) {
    return value;
  }
  const num2 = Number(value);
  return isNaN(num2) ? value : Math.round(num2);
};
const setParamIfDefined = (url, key, value, deleteExisting, roundValue) => {
  if (value) {
    if (roundValue) {
      value = roundIfNumeric(value);
    }
    url.searchParams.set(key, value.toString());
  } else if (deleteExisting) {
    url.searchParams.delete(key);
  }
};
const setParamIfUndefined = (url, key, value) => {
  if (!url.searchParams.has(key)) {
    url.searchParams.set(key, value.toString());
  }
};
const getNumericParam = (url, key) => {
  const value = Number(url.searchParams.get(key));
  return isNaN(value) ? void 0 : value;
};
const toRelativeUrl = (url) => {
  const { pathname, search } = url;
  return `${pathname}${search}`;
};
const toCanonicalUrlString = (url) => {
  return url.hostname === "n" ? toRelativeUrl(url) : url.toString();
};
const toUrl = (url, base) => {
  return typeof url === "string" ? new URL(url, base ?? "http://n/") : url;
};
const cdnDomains = new Map(Object.entries(domains));
const cdnSubdomains = Object.entries(subdomains);
function getImageCdnForUrl(url) {
  return getImageCdnForUrlByDomain(url) || getImageCdnForUrlByPath(url);
}
function getImageCdnForUrlByDomain(url) {
  if (typeof url === "string" && !url.startsWith("https://")) {
    return false;
  }
  const { hostname } = toUrl(url);
  if (cdnDomains.has(hostname)) {
    return cdnDomains.get(hostname);
  }
  for (const [subdomain, cdn] of cdnSubdomains) {
    if (hostname.endsWith(`.${subdomain}`)) {
      return cdn;
    }
  }
  return false;
}
function getImageCdnForUrlByPath(url) {
  const { pathname } = toUrl(url);
  for (const [prefix, cdn] of Object.entries(paths)) {
    if (pathname.startsWith(prefix)) {
      return cdn;
    }
  }
  return false;
}
const transform$m = ({ url: originalUrl, width, height, format }) => {
  const url = toUrl(originalUrl);
  if (width && width > 4e3) {
    if (height) {
      height = Math.round(height * 4e3 / width);
    }
    width = 4e3;
  }
  if (height && height > 4e3) {
    if (width) {
      width = Math.round(width * 4e3 / height);
    }
    height = 4e3;
  }
  setParamIfDefined(url, "w", width, true, true);
  setParamIfDefined(url, "h", height, true, true);
  setParamIfDefined(url, "fm", format);
  setParamIfUndefined(url, "fit", "fill");
  return url;
};
const transform$l = ({ url: originalUrl, width, height, format }) => {
  const url = toUrl(originalUrl);
  setParamIfDefined(url, "width", width, true, true);
  setParamIfDefined(url, "height", height, true, true);
  setParamIfDefined(url, "format", format);
  if (width && height) {
    setParamIfUndefined(url, "fit", "cover");
    setParamIfUndefined(url, "sharp", "true");
  }
  return url;
};
const transform$k = ({ url: originalUrl, width, height, format }) => {
  const url = toUrl(originalUrl);
  setParamIfDefined(url, "w", width, true, true);
  setParamIfDefined(url, "h", height, true, true);
  setParamIfUndefined(url, "fit", "min");
  if (format) {
    url.searchParams.set("fm", format);
    const fm = url.searchParams.get("auto");
    if (fm === "format") {
      url.searchParams.delete("auto");
    } else if (fm?.includes("format")) {
      url.searchParams.set("auto", fm.split(",").filter((s) => s !== "format").join(","));
    }
  } else {
    url.searchParams.delete("fm");
    if (!url.searchParams.get("auto")?.includes("format")) {
      url.searchParams.append("auto", "format");
    }
  }
  return url;
};
const shopifyRegex = /(.+?)(?:_(?:(pico|icon|thumb|small|compact|medium|large|grande|original|master)|(\d*)x(\d*)))?(?:_crop_([a-z]+))?(\.[a-zA-Z]+)(\.png|\.jpg|\.webp|\.avif)?$/;
const parse$6 = (imageUrl) => {
  const url = toUrl(imageUrl);
  const match = url.pathname.match(shopifyRegex);
  if (!match) {
    throw new Error("Invalid Shopify URL");
  }
  const [, path, size, width, height, crop, extension, format] = match;
  url.pathname = `${path}${extension}`;
  const widthString = width ? width : url.searchParams.get("width");
  const heightString = height ? height : url.searchParams.get("height");
  url.searchParams.delete("width");
  url.searchParams.delete("height");
  return {
    base: url.toString(),
    width: Number(widthString) || void 0,
    height: Number(heightString) || void 0,
    format: format ? format.slice(1) : void 0,
    params: { crop, size },
    cdn: "shopify"
  };
};
const generate$7 = ({ base, width, height, format, params }) => {
  const url = toUrl(base);
  setParamIfDefined(url, "width", width, true, true);
  setParamIfDefined(url, "height", height, true, true);
  setParamIfDefined(url, "crop", params?.crop);
  setParamIfDefined(url, "format", format);
  return url;
};
const transform$j = ({ url: originalUrl, width, height }) => {
  const parsed = parse$6(originalUrl);
  if (!parsed) {
    return;
  }
  const props17 = {
    ...parsed,
    width,
    height
  };
  return generate$7(props17);
};
const transform$i = ({ url: originalUrl, width, height }) => {
  const url = toUrl(originalUrl);
  setParamIfDefined(url, "w", width, true, true);
  setParamIfDefined(url, "h", height, true, true);
  setParamIfUndefined(url, "crop", "1");
  return url;
};
const transform$h = ({ url: originalUrl, width, height }) => {
  const url = toUrl(originalUrl);
  setParamIfDefined(url, "w", width, true, true);
  setParamIfDefined(url, "h", height, true, true);
  setParamIfDefined(url, "q", getNumericParam(url, "q"), true);
  return url;
};
const cloudinaryRegex = /https?:\/\/(?<host>[^\/]+)\/(?<cloudName>[^\/]+)\/(?<assetType>image|video|raw)\/(?<deliveryType>upload|fetch|private|authenticated|sprite|facebook|twitter|youtube|vimeo)\/?(?<signature>s\-\-[a-zA-Z0-9]+\-\-)?\/?(?<transformations>(?:[^_\/]+_[^,\/]+,?)*)?\/(?:(?<version>v\d+)\/)?(?<idAndFormat>[^\s]+)$/g;
const parseTransforms$2 = (transformations) => {
  return transformations ? Object.fromEntries(transformations.split(",").map((t) => t.split("_"))) : {};
};
const formatUrl$2 = ({ host, cloudName, assetType, deliveryType, signature, transformations = {}, version: version2, id, format }) => {
  if (format) {
    transformations.f = format;
  }
  const transformString = Object.entries(transformations).map(([key, value]) => `${key}_${value}`).join(",");
  const pathSegments = [
    host,
    cloudName,
    assetType,
    deliveryType,
    signature,
    transformString,
    version2,
    id
  ].filter(Boolean).join("/");
  return `https://${pathSegments}`;
};
const parse$5 = (imageUrl) => {
  const url = toUrl(imageUrl);
  const matches = [...url.toString().matchAll(cloudinaryRegex)];
  if (!matches.length) {
    throw new Error("Invalid Cloudinary URL");
  }
  const group = matches[0].groups || {};
  const { transformations: transformString = "", idAndFormat, ...baseParams } = group;
  delete group.idAndFormat;
  const lastDotIndex = idAndFormat.lastIndexOf(".");
  const id = lastDotIndex < 0 ? idAndFormat : idAndFormat.slice(0, lastDotIndex);
  const originalFormat = lastDotIndex < 0 ? void 0 : idAndFormat.slice(lastDotIndex + 1);
  const { w, h, f, ...transformations } = parseTransforms$2(transformString);
  const format = f && f !== "auto" ? f : originalFormat;
  const base = formatUrl$2({ ...baseParams, id, transformations });
  return {
    base,
    width: Number(w) || void 0,
    height: Number(h) || void 0,
    format,
    cdn: "cloudinary",
    params: {
      ...group,
      id: group.deliveryType === "fetch" ? idAndFormat : id,
      format,
      transformations
    }
  };
};
const generate$6 = ({ base, width, height, format, params }) => {
  const parsed = parse$5(base.toString());
  const props17 = {
    transformations: {},
    ...parsed.params,
    ...params,
    format: format || "auto"
  };
  if (width) {
    props17.transformations.w = roundIfNumeric(width).toString();
  }
  if (height) {
    props17.transformations.h = roundIfNumeric(height).toString();
  }
  props17.transformations.c ||= "lfill";
  return formatUrl$2(props17);
};
const transform$g = ({ url: originalUrl, width, height, format = "auto" }) => {
  const parsed = parse$5(originalUrl);
  if (!parsed) {
    throw new Error("Invalid Cloudinary URL");
  }
  if (parsed.params?.assetType !== "image") {
    throw new Error("Cloudinary transformer only supports images");
  }
  if (parsed.params?.signature) {
    throw new Error("Cloudinary transformer does not support signed URLs");
  }
  const props17 = {
    ...parsed,
    width,
    height,
    format
  };
  return generate$6(props17);
};
const cloudflareRegex = /https?:\/\/(?<host>[^\/]+)\/cdn-cgi\/image\/(?<transformations>[^\/]+)?\/(?<path>.*)$/g;
const parseTransforms$1 = (transformations) => Object.fromEntries(transformations.split(",").map((t) => t.split("=")));
const formatUrl$1 = ({ host, transformations = {}, path }) => {
  const transformString = Object.entries(transformations).map(([key, value]) => `${key}=${value}`).join(",");
  const pathSegments = [
    host,
    "cdn-cgi",
    "image",
    transformString,
    path
  ].join("/");
  return `https://${pathSegments}`;
};
const parse$4 = (imageUrl) => {
  const url = toUrl(imageUrl);
  const matches = [...url.toString().matchAll(cloudflareRegex)];
  if (!matches.length) {
    throw new Error("Invalid Cloudflare URL");
  }
  const group = matches[0].groups || {};
  const { transformations: transformString, ...baseParams } = group;
  const { width, height, f, ...transformations } = parseTransforms$1(transformString);
  formatUrl$1({ ...baseParams, transformations });
  return {
    base: url.toString(),
    width: Number(width) || void 0,
    height: Number(height) || void 0,
    format: f,
    cdn: "cloudflare",
    params: { ...group, transformations }
  };
};
const generate$5 = ({ base, width, height, format, params }) => {
  const parsed = parse$4(base.toString());
  const props17 = {
    transformations: {},
    ...parsed.params,
    ...params
  };
  if (width) {
    props17.transformations.width = width?.toString();
  }
  if (height) {
    props17.transformations.height = height?.toString();
  }
  if (format) {
    props17.transformations.f = format === "jpg" ? "jpeg" : format;
  }
  props17.transformations.fit ||= "cover";
  return new URL(formatUrl$1(props17));
};
const transform$f = ({ url: originalUrl, width, height, format = "auto" }) => {
  const parsed = parse$4(originalUrl);
  if (!parsed) {
    throw new Error("Invalid Cloudflare URL");
  }
  const props17 = {
    ...parsed,
    width,
    height,
    format
  };
  return generate$5(props17);
};
const transform$e = ({ url: originalUrl, width, height }) => {
  const url = toUrl(originalUrl);
  setParamIfDefined(url, "width", width, true, true);
  if (width && height) {
    setParamIfUndefined(url, "aspect_ratio", `${width}:${height}`);
  }
  return url;
};
const storyBlokAssets = /(?<id>\/f\/\d+\/\d+x\d+\/\w+\/[^\/]+)\/?(?<modifiers>m\/?(?<crop>\d+x\d+:\d+x\d+)?\/?(?<resize>(?<flipx>\-)?(?<width>\d+)x(?<flipy>\-)?(?<height>\d+))?\/?(filters\:(?<filters>[^\/]+))?)?$/g;
const storyBlokImg2 = /^(?<modifiers>\/(?<crop>\d+x\d+:\d+x\d+)?\/?(?<resize>(?<flipx>\-)?(?<width>\d+)x(?<flipy>\-)?(?<height>\d+))?\/?(filters\:(?<filters>[^\/]+))?\/?)?(?<id>\/f\/.+)$/g;
const splitFilters = (filters) => {
  if (!filters) {
    return {};
  }
  return Object.fromEntries(filters.split(":").map((filter) => {
    if (!filter)
      return [];
    const [key, value] = filter.split("(");
    return [key, value.replace(")", "")];
  }));
};
const generateFilters = (filters) => {
  if (!filters) {
    return void 0;
  }
  const filterItems = Object.entries(filters).map(([key, value]) => `${key}(${value ?? ""})`);
  if (filterItems.length === 0) {
    return void 0;
  }
  return `filters:${filterItems.join(":")}`;
};
const parse$3 = (imageUrl) => {
  const url = toUrl(imageUrl);
  const regex = url.hostname === "img2.storyblok.com" ? storyBlokImg2 : storyBlokAssets;
  const [matches] = url.pathname.matchAll(regex);
  if (!matches || !matches.groups) {
    throw new Error("Invalid Storyblok URL");
  }
  const { id, crop, width, height, filters, flipx, flipy } = matches.groups;
  const { format, ...filterMap } = splitFilters(filters);
  if (url.hostname === "img2.storyblok.com") {
    url.hostname = "a.storyblok.com";
  }
  return {
    base: url.origin + id,
    width: Number(width) || void 0,
    height: Number(height) || void 0,
    format,
    params: {
      crop,
      filters: filterMap,
      flipx,
      flipy
    },
    cdn: "storyblok"
  };
};
const generate$4 = ({ base, width = 0, height = 0, format, params = {} }) => {
  const { crop, filters, flipx = "", flipy = "" } = params;
  const size = `${flipx}${width}x${flipy}${height}`;
  return new URL([base, "m", crop, size, generateFilters(filters), format].filter(Boolean).join("/"));
};
const transform$d = ({ url: originalUrl, width, height, format }) => {
  const parsed = parse$3(originalUrl);
  if (!parsed) {
    return;
  }
  if (format) {
    if (!parsed.params) {
      parsed.params = { filters: {} };
    }
    if (!parsed.params.filters) {
      parsed.params.filters = {};
    }
    parsed.params.filters.format = format;
  }
  return generate$4({
    ...parsed,
    width,
    height
  });
};
const transform$c = ({ url: originalUrl, width, height, format }) => {
  const url = toUrl(originalUrl);
  setParamIfDefined(url, "w", width, true, true);
  setParamIfDefined(url, "h", height, true, true);
  setParamIfDefined(url, "fm", format, true);
  if (width && height) {
    setParamIfUndefined(url, "fit", "crop");
  }
  return url;
};
const delegateUrl = (url) => {
  const parsed = toUrl(url);
  const source = parsed.searchParams.get("url");
  if (!source || !source.startsWith("http")) {
    return false;
  }
  const cdn = getImageCdnForUrlByDomain(source);
  if (!cdn) {
    return false;
  }
  return {
    cdn,
    url: source
  };
};
const generate$3 = ({ base, width, params: { quality = 75, root = "_vercel" } = {} }) => {
  const url = new URL("http://n");
  url.pathname = `/${root}/image`;
  url.searchParams.set("url", base.toString());
  setParamIfDefined(url, "w", width, false, true);
  setParamIfUndefined(url, "q", quality);
  return toRelativeUrl(url);
};
const transform$b = ({ url, width, cdn }) => {
  const parsedUrl = toUrl(url);
  const isNextImage = parsedUrl.pathname.startsWith("/_next/image") || parsedUrl.pathname.startsWith("/_vercel/image");
  const src = isNextImage ? parsedUrl.searchParams.get("url") : url.toString();
  if (!src) {
    return void 0;
  }
  setParamIfDefined(parsedUrl, "w", width, true, true);
  if (isNextImage) {
    return toCanonicalUrlString(parsedUrl);
  }
  return generate$3({
    base: src,
    width,
    params: { root: cdn === "nextjs" ? "_next" : "_vercel" }
  });
};
const transform$a = (params) => transform$b({ ...params, cdn: "nextjs" });
const transform$9 = ({ url: originalUrl, width, height, format }) => {
  const url = toUrl(originalUrl);
  setParamIfDefined(url, "wid", width, true, true);
  setParamIfDefined(url, "hei", height, true, true);
  setParamIfDefined(url, "fmt", format, true);
  setParamIfDefined(url, "qlt", getNumericParam(url, "qlt"), true);
  setParamIfDefined(url, "scl", getNumericParam(url, "scl"), true);
  setParamIfUndefined(url, "fit", "crop");
  if (!width && !height) {
    setParamIfUndefined(url, "scl", 1);
  }
  return url;
};
const transform$8 = ({ url: originalUrl, width, height, format }) => {
  const url = toUrl(originalUrl);
  setParamIfDefined(url, "width", width, true, true);
  setParamIfDefined(url, "height", height, true, true);
  setParamIfDefined(url, "format", format, true);
  setParamIfDefined(url, "quality", getNumericParam(url, "quality"), true);
  setParamIfUndefined(url, "enlarge", 0);
  return url;
};
const transform$7 = ({ url: originalUrl, width, height, format }) => {
  const url = toUrl(originalUrl);
  setParamIfDefined(url, "width", width, true, true);
  setParamIfDefined(url, "height", height, true, true);
  setParamIfDefined(url, "format", format);
  setParamIfDefined(url, "quality", getNumericParam(url, "quality"), true);
  return url;
};
const OBJECT_TO_DIRECTIVES_MAP = {
  width: "w",
  height: "h",
  autoWidthWithFallback: "w_auto",
  auto_width_fallback: "w_auto",
  scaleToScreenWidth: "pc",
  scale_to_screen_width: "pc",
  crop: "cr",
  outputFormat: "f",
  format: "f",
  fit: "m",
  fitMethod: "m",
  compression: "cmpr",
  sharpness: "s",
  rotate: "r",
  inline: "in",
  keepMeta: "meta",
  keep_meta: "meta",
  noOptimization: "pass",
  no_optimization: "pass",
  force_download: "dl",
  max_device_pixel_ratio: "maxdpr",
  maxDevicePixelRatio: "maxdpr"
};
function getDirective(key) {
  let keyArray = Object.keys(OBJECT_TO_DIRECTIVES_MAP);
  let directive = keyArray.find((k) => OBJECT_TO_DIRECTIVES_MAP[k] === key) || "";
  return directive;
}
function getParameterArray(url) {
  let url_string = url.toString();
  let paramArray = [];
  if (url_string) {
    let splitURL = url_string.split("imgeng=");
    if (splitURL.length > 1) {
      paramArray = splitURL[1].split("/");
    }
  }
  return paramArray;
}
function getBaseUrl(url) {
  let url_string = url.toString();
  let baseUrl = "";
  if (url_string) {
    let splitURL = url_string.split("imgeng=");
    if (splitURL.length > 1) {
      baseUrl = splitURL[0].slice(0, -1);
    } else
      baseUrl = url_string;
  }
  return baseUrl;
}
const transform$6 = ({ url: originalUrl, width, height, format }) => {
  const url = toUrl(originalUrl);
  const src = getBaseUrl(url);
  let directives = {};
  const param = url.toString() === src ? [] : getParameterArray(url);
  if (param.length) {
    directives = getDirectives(param);
  }
  if (width)
    directives["width"] = width;
  if (height)
    directives["height"] = height;
  if (format)
    directives["format"] = format;
  if (!directives.hasOwnProperty("fit")) {
    directives = { ...directives, "fit": "cropbox" };
  }
  let directives_string = build_IE_directives(directives);
  let query_string = build_IE_query_string(directives_string);
  let query_prefix = query_string === "" ? "" : src.includes("?") ? "&" : "?";
  return `${src}${query_prefix}${query_string}`;
};
function build_IE_directives(directives) {
  return Object.entries(directives).reduce((acc, [k, v]) => {
    return acc + maybe_create_directive(k, v);
  }, "");
}
function build_IE_query_string(directives_string) {
  if (directives_string && directives_string !== "") {
    return `imgeng=${directives_string}`;
  }
  return "";
}
function maybe_create_directive(directive, value) {
  let translated_directive = OBJECT_TO_DIRECTIVES_MAP[directive];
  if (translated_directive && (value || value === 0)) {
    return `/${translated_directive}_${value}`;
  }
  return "";
}
function getDirectives(paramArray) {
  let directives = {};
  paramArray.forEach((para) => {
    let keyValue = para.split("_");
    if (keyValue.length > 1) {
      let key = keyValue[0];
      let value = keyValue[1];
      let directiveKey = getDirective(key);
      if (directiveKey) {
        directives[directiveKey] = value;
      }
    }
  });
  return directives;
}
const transform$5 = ({ url: originalUrl, width, height, format }) => {
  const url = toUrl(originalUrl);
  setParamIfDefined(url, "width", width, true, true);
  setParamIfDefined(url, "height", height, true, true);
  setParamIfDefined(url, "format", format);
  if (!url.searchParams.has("format")) {
    setParamIfUndefined(url, "auto", "webp");
  }
  if (width && height) {
    setParamIfUndefined(url, "fit", "crop");
  }
  return url;
};
const cloudflareImagesRegex = /https?:\/\/(?<host>[^\/]+)\/cdn-cgi\/imagedelivery\/(?<accountHash>[^\/]+)\/(?<imageId>[^\/]+)\/*(?<transformations>[^\/]+)*$/g;
const parseTransforms = (transformations) => Object.fromEntries(transformations?.split(",")?.map((t) => t.split("=")) ?? []);
const formatUrl = ({ host, accountHash, transformations = {}, imageId }) => {
  const transformString = Object.entries(transformations).map(([key, value]) => `${key}=${value}`).join(",");
  const pathSegments = [
    host,
    "cdn-cgi",
    "imagedelivery",
    accountHash,
    imageId,
    transformString
  ].join("/");
  return `https://${pathSegments}`;
};
const parse$2 = (imageUrl) => {
  const url = toUrl(imageUrl);
  const matches = [...url.toString().matchAll(cloudflareImagesRegex)];
  if (!matches.length) {
    throw new Error("Invalid Cloudflare Images URL");
  }
  const group = matches[0].groups || {};
  const { transformations: transformString, ...baseParams } = group;
  const { w, h, f, ...transformations } = parseTransforms(transformString);
  return {
    base: url.toString(),
    width: Number(w) || void 0,
    height: Number(h) || void 0,
    format: f,
    cdn: "cloudflare_images",
    params: { ...baseParams, transformations }
  };
};
const generate$2 = ({ base, width, height, format, params }) => {
  const parsed = parse$2(base.toString());
  const props17 = {
    transformations: {},
    ...parsed.params,
    ...params
  };
  if (width) {
    props17.transformations.w = width?.toString();
  }
  if (height) {
    props17.transformations.h = height?.toString();
  }
  if (format) {
    props17.transformations.f = format;
  }
  props17.transformations.fit ||= "cover";
  return new URL(formatUrl(props17));
};
const transform$4 = ({ url: originalUrl, width, height, format = "auto" }) => {
  const parsed = parse$2(originalUrl);
  if (!parsed) {
    throw new Error("Invalid Cloudflare Images URL");
  }
  const props17 = {
    ...parsed,
    width,
    height,
    format
  };
  return generate$2(props17);
};
const parse$1 = (imageUrl) => {
  const url = toUrl(imageUrl);
  const [modifiers, ...id] = url.pathname.split("/").slice(1);
  const params = Object.fromEntries(modifiers.split(",").map((modifier) => {
    const [key, value] = modifier.split("_");
    return [key, value];
  }));
  if (params.s) {
    const [width, height] = params.s.split("x");
    params.w ||= width;
    params.h ||= height;
  }
  return {
    base: id.join("/"),
    width: Number(params.w) || void 0,
    height: Number(params.h) || void 0,
    quality: Number(params.q) || void 0,
    format: params.f || "auto",
    params,
    cdn: "ipx"
  };
};
const generate$1 = ({ base: id, width, height, format, params }) => {
  const modifiers = params?.modifiers ?? {};
  if (width && height) {
    modifiers.s = `${width}x${height}`;
  } else if (width) {
    modifiers.w = `${width}`;
  } else if (height) {
    modifiers.h = `${height}`;
  }
  if (format) {
    modifiers.f = format;
  }
  const base = params?.base.endsWith("/") ? params?.base : `${params?.base}/`;
  const modifiersString = Object.entries(modifiers).map(([key, value]) => `${key}_${value}`).join(",");
  const stringId = id.toString();
  const image = stringId.startsWith("/") ? stringId.slice(1) : stringId;
  return `${base}${modifiersString}/${image}`;
};
const transform$3 = (options) => {
  const url = String(options.url);
  const parsedUrl = toUrl(url);
  const defaultBase = parsedUrl.pathname.startsWith("/_ipx") && parsedUrl.hostname !== "n" ? `${parsedUrl.origin}/_ipx` : "/_ipx";
  const base = options.cdnOptions?.ipx?.base ?? defaultBase;
  const isIpxUrl = base && base !== "/" && url.startsWith(base);
  if (isIpxUrl) {
    const parsed = parse$1(url.replace(base, ""));
    return generate$1({
      ...parsed,
      ...options,
      params: {
        ...options.cdnOptions?.ipx,
        base
      }
    });
  }
  return generate$1({
    ...options,
    base: url,
    params: {
      ...options.cdnOptions?.ipx,
      base
    }
  });
};
const transform$2 = ({ url: originalUrl, width, height, format }) => {
  const parsedUrl = toUrl(originalUrl);
  const href = toCanonicalUrlString(new URL(parsedUrl.pathname, parsedUrl.origin));
  const url = { searchParams: new URLSearchParams() };
  setParamIfDefined(url, "href", href, true, true);
  setParamIfDefined(url, "w", width, true, true);
  setParamIfDefined(url, "h", height, true, true);
  setParamIfDefined(url, "f", format);
  return `/_image?${url.searchParams.toString()}`;
};
const skippedParams = /* @__PURE__ */ new Set([
  "w",
  "h",
  "q",
  "fm",
  "url",
  "width",
  "height",
  "quality"
]);
const parse = (url) => {
  const parsed = toUrl(url);
  const width = Number(parsed.searchParams.get("w") ?? parsed.searchParams.get("width")) ?? void 0;
  const height = Number(parsed.searchParams.get("h") ?? parsed.searchParams.get("height")) ?? void 0;
  const quality = Number(parsed.searchParams.get("q") ?? parsed.searchParams.get("quality")) || void 0;
  const format = parsed.searchParams.get("fm") || void 0;
  const base = parsed.searchParams.get("url") || "";
  const params = {
    quality
  };
  parsed.searchParams.forEach((value, key) => {
    if (skippedParams.has(key)) {
      return;
    }
    params[key] = value;
  });
  parsed.search = "";
  return {
    base,
    width,
    height,
    format,
    params,
    cdn: "netlify"
  };
};
const generate = ({ base, width, height, format, params: { site, quality, ...params } = {} }) => {
  const url = toUrl("/.netlify/images", site);
  Object.entries(params).forEach(([key, value]) => setParamIfDefined(url, key, value));
  setParamIfDefined(url, "q", quality, true, true);
  setParamIfDefined(url, "w", width, true, true);
  setParamIfDefined(url, "h", height, true, true);
  setParamIfDefined(url, "fm", format);
  setParamIfUndefined(url, "fit", "cover");
  url.searchParams.set("url", base.toString());
  return toCanonicalUrlString(url);
};
const transform$1 = (options) => {
  const url = toUrl(options.url);
  if (url.pathname.startsWith("/.netlify/images")) {
    const { params, base, format } = parse(url);
    return generate({
      base,
      format,
      ...options,
      params: {
        ...params,
        // If hostname is "n", we're dealing with a relative URL, so we don't need to set the site param
        site: url.hostname === "n" ? void 0 : url.origin
      }
    });
  }
  return generate({
    ...options,
    base: options.url,
    params: {
      site: options.cdnOptions?.netlify?.site
    }
  });
};
const getTransformParams = (url) => {
  const transforms = url.searchParams.get("tr") || "";
  return transforms.split(",").reduce((acc, transform2) => {
    const [key, value] = transform2.split("-");
    acc[key] = value;
    return acc;
  }, {});
};
const transform = ({ url: originalUrl, width, height, format }) => {
  const url = toUrl(originalUrl);
  const transformParams = getTransformParams(url);
  transformParams.w = width ? Math.round(width) : width;
  transformParams.h = height ? Math.round(height) : height;
  if (!transformParams.fm) {
    transformParams.fm = "auto";
  }
  if (format) {
    transformParams.fm = format;
  }
  const tr = Object.keys(transformParams).map((key) => {
    const value = transformParams[key];
    if (value) {
      return `${key}-${value}`;
    }
  }).filter((x) => x).join(",");
  url.searchParams.set("tr", tr);
  return url;
};
const delegators = {
  vercel: delegateUrl,
  nextjs: delegateUrl
};
function getDelegatedCdn(url, cdn) {
  if (!(cdn in delegators)) {
    return false;
  }
  const maybeDelegate = delegators[cdn];
  if (!maybeDelegate) {
    return false;
  }
  return maybeDelegate(url);
}
function getCanonicalCdnForUrl(url, defaultCdn) {
  const cdn = getImageCdnForUrl(url) || defaultCdn;
  if (!cdn) {
    return false;
  }
  const maybeDelegated = getDelegatedCdn(url, cdn);
  if (maybeDelegated) {
    return maybeDelegated;
  }
  return { cdn, url };
}
const getTransformer = (cdn) => ({
  imgix: transform$k,
  contentful: transform$m,
  "builder.io": transform$l,
  shopify: transform$j,
  wordpress: transform$i,
  cloudimage: transform$h,
  cloudinary: transform$g,
  bunny: transform$e,
  storyblok: transform$d,
  cloudflare: transform$f,
  vercel: transform$b,
  nextjs: transform$a,
  scene7: transform$9,
  "kontent.ai": transform$c,
  keycdn: transform$8,
  directus: transform$7,
  imageengine: transform$6,
  contentstack: transform$5,
  "cloudflare_images": transform$4,
  ipx: transform$3,
  astro: transform$2,
  netlify: transform$1,
  imagekit: transform
})[cdn];
var getSizes = (width, layout) => {
  if (!width || !layout) {
    return void 0;
  }
  switch (layout) {
    case `constrained`:
      return `(min-width: ${width}px) ${width}px, 100vw`;
    case `fixed`:
      return `${width}px`;
    case `fullWidth`:
      return `100vw`;
    default:
      return void 0;
  }
};
var pixelate = (value) => value || value === 0 ? `${value}px` : void 0;
var getStyle = ({
  width,
  height,
  aspectRatio,
  layout,
  objectFit = "cover",
  background
}) => {
  const styleEntries = [
    ["object-fit", objectFit]
  ];
  if (background?.startsWith("https:") || background?.startsWith("http:") || background?.startsWith("data:")) {
    styleEntries.push(["background-image", `url(${background})`]);
    styleEntries.push(["background-size", "cover"]);
    styleEntries.push(["background-repeat", "no-repeat"]);
  } else {
    styleEntries.push(["background", background]);
  }
  if (layout === "fixed") {
    styleEntries.push(["width", pixelate(width)]);
    styleEntries.push(["height", pixelate(height)]);
  }
  if (layout === "constrained") {
    styleEntries.push(["max-width", pixelate(width)]);
    styleEntries.push(["max-height", pixelate(height)]);
    styleEntries.push([
      "aspect-ratio",
      aspectRatio ? `${aspectRatio}` : void 0
    ]);
    styleEntries.push(["width", "100%"]);
  }
  if (layout === "fullWidth") {
    styleEntries.push(["width", "100%"]);
    styleEntries.push([
      "aspect-ratio",
      aspectRatio ? `${aspectRatio}` : void 0
    ]);
    styleEntries.push(["height", pixelate(height)]);
  }
  return Object.fromEntries(
    styleEntries.filter(([, value]) => value)
  );
};
var DEFAULT_RESOLUTIONS = [
  6016,
  // 6K
  5120,
  // 5K
  4480,
  // 4.5K
  3840,
  // 4K
  3200,
  // QHD+
  2560,
  // WQXGA
  2048,
  // QXGA
  1920,
  // 1080p
  1668,
  // Various iPads
  1280,
  // 720p
  1080,
  // iPhone 6-8 Plus
  960,
  // older horizontal phones
  828,
  // iPhone XR/11
  750,
  // iPhone 6-8
  640
  // older and lower-end phones
];
var LOW_RES_WIDTH = 24;
var getBreakpoints = ({
  width,
  layout
}) => {
  if (layout === "fullWidth") {
    return DEFAULT_RESOLUTIONS;
  }
  if (!width) {
    return [];
  }
  const doubleWidth = width * 2;
  if (layout === "fixed") {
    return [width, doubleWidth];
  }
  if (layout === "constrained") {
    return [
      // Always include the image at 1x and 2x the specified width
      width,
      doubleWidth,
      // Filter out any resolutions that are larger than the double-res image
      ...DEFAULT_RESOLUTIONS.filter((w) => w < doubleWidth)
    ];
  }
  return [];
};
var getSrcSet = ({
  src,
  width,
  layout = "constrained",
  height,
  aspectRatio,
  breakpoints,
  cdn,
  transformer
}) => {
  const canonical = getCanonicalCdnForUrl(src, cdn);
  if (!canonical) {
    return;
  }
  transformer ||= getTransformer(canonical.cdn);
  if (!transformer) {
    return;
  }
  breakpoints ||= getBreakpoints({ width, layout });
  return breakpoints.sort((a2, b) => a2 - b).map((bp) => {
    let transformedHeight;
    if (height && aspectRatio) {
      transformedHeight = Math.round(bp / aspectRatio);
    }
    const transformed = transformer({
      url: canonical.url,
      width: bp,
      height: transformedHeight
    });
    if (transformed) {
      return `${transformed.toString()} ${bp}w`;
    }
    return "";
  }).join(",\n");
};
function transformProps({
  src,
  width,
  height,
  priority,
  layout = "constrained",
  aspectRatio,
  cdn,
  transformer,
  objectFit = "cover",
  background,
  breakpoints,
  ...props17
}) {
  const canonical = getCanonicalCdnForUrl(src, cdn);
  let url = src;
  if (canonical) {
    url = canonical.url;
    transformer ||= getTransformer(canonical.cdn);
  }
  width = width && Number(width) || void 0;
  height = height && Number(height) || void 0;
  if (priority) {
    props17.loading ||= "eager";
    props17.fetchpriority ||= "high";
  } else {
    props17.loading ||= "lazy";
    props17.decoding ||= "async";
  }
  if (props17.alt === "") {
    props17.role ||= "presentation";
  }
  if (aspectRatio) {
    if (width) {
      if (height) {
        console.error(
          "Ignoring aspectRatio because width and height are both set"
        );
      } else {
        height = width / aspectRatio;
      }
    } else if (height) {
      width = height * aspectRatio;
    } else if (layout !== "fullWidth") {
      console.error(
        "When aspectRatio is set, either width or height must also be set"
      );
    }
  } else if (width && height) {
    aspectRatio = width / height;
  } else if (layout !== "fullWidth") {
    console.error("Either aspectRatio or both width and height must be set");
  }
  if (transformer && background === "auto") {
    const lowResHeight = aspectRatio ? Math.round(LOW_RES_WIDTH * aspectRatio) : void 0;
    const lowResImage = transformer({
      url,
      width: LOW_RES_WIDTH,
      height: lowResHeight
    });
    if (lowResImage) {
      background = lowResImage.toString();
    }
  }
  const styleProps = {
    width,
    height,
    aspectRatio,
    layout,
    objectFit,
    background
  };
  if (transformer) {
    props17.sizes ||= getSizes(width, layout);
    props17.style = {
      ...getStyle(styleProps),
      ...props17.style
    };
    props17.srcset = getSrcSet({
      src: url,
      width,
      height,
      aspectRatio,
      layout,
      breakpoints,
      transformer,
      cdn
    });
    const transformed = transformer({ url, width, height });
    if (transformed) {
      url = transformed;
    }
    if (layout === "fullWidth" || layout === "constrained") {
      width = void 0;
      height = void 0;
    }
  }
  return {
    ...props17,
    src: url.toString(),
    width,
    height
  };
}
function a(t, o) {
  const r2 = RegExp(t, "g");
  return (e) => {
    if (typeof e != "string")
      throw new TypeError(`expected an argument of type string, but got ${typeof e}`);
    return e.match(r2) ? e.replace(r2, o) : e;
  };
}
const r = a(/[A-Z]/, (o) => `-${o.toLowerCase()}`);
function c(o, r$1 = r) {
  if (!o || typeof o != "object" || Array.isArray(o))
    throw new TypeError(`expected an argument of type object, but got ${typeof o}`);
  return Object.keys(o).map((e) => `${r$1(e)}: ${o[e]};`).join(`
`);
}
const Image = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let parentStyle;
  let props17;
  let alt;
  let styleObj;
  let transformedProps;
  let style;
  ({ style: parentStyle, ...props17 } = $$props);
  ({ alt, style: styleObj, ...transformedProps } = transformProps({ ...props17, style: {} }));
  style = [c(styleObj), parentStyle].filter(Boolean).join(";");
  return `<img${spread(
    [
      { alt: escape_attribute_value(alt) },
      { style: escape_attribute_value(style) },
      escape_object(transformedProps)
    ],
    {}
  )}>`;
});
function checkCloudinaryCloudName(cloudName) {
  if (!cloudName) {
    throw new Error("[Svelte-cloudinary] A Cloudinary Cloud name is required, please make sure VITE_PUBLIC_CLOUDINARY_CLOUD_NAME is set and configured in your environment");
  }
}
const name = "svelte";
const version$1 = "4.2.9";
const description = "Cybernetically enhanced web apps";
const type = "module";
const module = "src/runtime/index.js";
const main = "src/runtime/index.js";
const files = [
  "src",
  "!src/**/tsconfig.json",
  "types",
  "compiler.*",
  "register.js",
  "index.d.ts",
  "store.d.ts",
  "animate.d.ts",
  "transition.d.ts",
  "easing.d.ts",
  "motion.d.ts",
  "action.d.ts",
  "elements.d.ts",
  "svelte-html.d.ts",
  "README.md"
];
const exports = {
  "./package.json": "./package.json",
  ".": {
    types: "./types/index.d.ts",
    browser: {
      "default": "./src/runtime/index.js"
    },
    "default": "./src/runtime/ssr.js"
  },
  "./compiler": {
    types: "./types/index.d.ts",
    require: "./compiler.cjs",
    "default": "./src/compiler/index.js"
  },
  "./action": {
    types: "./types/index.d.ts"
  },
  "./animate": {
    types: "./types/index.d.ts",
    "default": "./src/runtime/animate/index.js"
  },
  "./easing": {
    types: "./types/index.d.ts",
    "default": "./src/runtime/easing/index.js"
  },
  "./internal": {
    "default": "./src/runtime/internal/index.js"
  },
  "./motion": {
    types: "./types/index.d.ts",
    "default": "./src/runtime/motion/index.js"
  },
  "./store": {
    types: "./types/index.d.ts",
    "default": "./src/runtime/store/index.js"
  },
  "./internal/disclose-version": {
    "default": "./src/runtime/internal/disclose-version/index.js"
  },
  "./transition": {
    types: "./types/index.d.ts",
    "default": "./src/runtime/transition/index.js"
  },
  "./elements": {
    types: "./elements.d.ts"
  }
};
const engines = {
  node: ">=16"
};
const types = "types/index.d.ts";
const repository = {
  type: "git",
  url: "https://github.com/sveltejs/svelte.git",
  directory: "packages/svelte"
};
const keywords = [
  "UI",
  "framework",
  "templates",
  "templating"
];
const author = "Rich Harris";
const license = "MIT";
const bugs = {
  url: "https://github.com/sveltejs/svelte/issues"
};
const homepage = "https://svelte.dev";
const dependencies = {
  "@ampproject/remapping": "^2.2.1",
  "@jridgewell/sourcemap-codec": "^1.4.15",
  "@jridgewell/trace-mapping": "^0.3.18",
  "@types/estree": "^1.0.1",
  acorn: "^8.9.0",
  "aria-query": "^5.3.0",
  "axobject-query": "^4.0.0",
  "code-red": "^1.0.3",
  "css-tree": "^2.3.1",
  "estree-walker": "^3.0.3",
  "is-reference": "^3.0.1",
  "locate-character": "^3.0.0",
  "magic-string": "^0.30.4",
  periscopic: "^3.1.0"
};
const devDependencies = {
  "@playwright/test": "^1.35.1",
  "@rollup/plugin-commonjs": "^24.1.0",
  "@rollup/plugin-json": "^6.0.0",
  "@rollup/plugin-node-resolve": "^15.1.0",
  "@sveltejs/eslint-config": "^6.0.4",
  "@types/aria-query": "^5.0.1",
  "@types/node": "^14.18.51",
  agadoo: "^3.0.0",
  "dts-buddy": "^0.4.3",
  esbuild: "^0.18.11",
  "eslint-plugin-lube": "^0.1.7",
  "happy-dom": "^9.20.3",
  jsdom: "22.0.0",
  kleur: "^4.1.5",
  rollup: "^3.26.2",
  "source-map": "^0.7.4",
  "tiny-glob": "^0.2.9",
  typescript: "^5.1.3",
  vitest: "^0.33.0"
};
const scripts = {
  format: "prettier . --cache --plugin-search-dir=. --write",
  check: "tsc --noEmit",
  test: 'vitest run && echo "manually check that there are no type errors in test/types by opening the files in there"',
  build: "rollup -c && pnpm types",
  "generate:version": "node ./scripts/generate-version.js",
  dev: "rollup -cw",
  posttest: "agadoo src/internal/index.js",
  types: "node ./scripts/generate-dts.js",
  lint: 'prettier . --cache --plugin-search-dir=. --check && eslint "{scripts,src,test}/**/*.js" --cache'
};
const sveltePkg = {
  name,
  version: version$1,
  description,
  type,
  module,
  main,
  files,
  exports,
  engines,
  types,
  repository,
  keywords,
  author,
  license,
  bugs,
  homepage,
  dependencies,
  devDependencies,
  scripts
};
const version = "1.2.1";
const metadata = {
  version
};
const SVELTE_CLOUDINARY_ANALYTICS_ID = "E";
const SVELTE_CLOUDINARY_VERSION = metadata.version.split("-")[0];
const SVELTE_VERSION = `${sveltePkg.version.split(".")[0]}.0.0`;
function getCldImageUrl(options, config, analytics) {
  const cloudName = public_env.PUBLIC_CLOUDINARY_CLOUD_NAME || "dyg15eafr";
  checkCloudinaryCloudName(cloudName);
  return constructCloudinaryUrl({
    options,
    config: Object.assign({
      cloud: {
        cloudName
      }
    }, config),
    analytics: Object.assign({
      sdkCode: SVELTE_CLOUDINARY_ANALYTICS_ID,
      sdkSemver: SVELTE_CLOUDINARY_VERSION,
      techVersion: SVELTE_VERSION,
      product: "B"
    }, analytics)
  });
}
function cloudinaryLoader({ loaderOptions, imageProps, cldOptions, cldConfig = {} }) {
  const options = {
    ...imageProps,
    ...cldOptions
  };
  options.width = typeof options.width === "string" ? parseInt(options.width) : options.width;
  options.height = typeof options.height === "string" ? parseInt(options.height) : options.height;
  let widthResize;
  if (typeof loaderOptions?.width === "number" && typeof options.width === "number" && loaderOptions.width !== options.width) {
    widthResize = loaderOptions.width;
  } else if (typeof loaderOptions?.width === "number" && typeof options?.width !== "number") {
    widthResize = loaderOptions.width;
    options.width = widthResize;
  }
  if (options.width && widthResize && widthResize < options.width) {
    options.widthResize = loaderOptions.width;
  }
  return getCldImageUrl(options, cldConfig);
}
const { Object: Object_1 } = globals;
const CldImage = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let alt;
  let src;
  let width;
  let height;
  let config;
  let imageProps;
  const CLD_OPTIONS = ["config", "deliveryType", "preserveTransformations"];
  transformationPlugins.forEach(({ props: props17 = [] }) => {
    props17.forEach((prop) => {
      if (CLD_OPTIONS.includes(prop)) {
        throw new Error(`Option ${prop} already exists!`);
      }
      CLD_OPTIONS.push(prop);
    });
  });
  const cldOptions = {};
  CLD_OPTIONS.forEach((key) => {
    if ($$props[key]) {
      cldOptions[key] = $$props[key] || void 0;
    }
  });
  ({ alt, src, width, height, config } = $$props);
  imageProps = {
    alt,
    src,
    width: typeof width === "string" ? parseInt(width) : width,
    height: typeof height === "string" ? parseInt(height) : height
  };
  {
    if (imageProps) {
      Object.keys($$props).filter((key) => !CLD_OPTIONS.includes(key)).forEach((key) => {
        imageProps[key] = $$props[key];
      });
    }
  }
  {
    if ($$props.preserveTransformations) {
      try {
        const transformations = getTransformations(imageProps.src).map((t) => t.join(","));
        cldOptions.rawTransformations = [...transformations.flat(), ...$$props.rawTransformations || []];
      } catch (e) {
        console.warn(`Failed to preserve transformations: ${e.message}`);
      }
    }
  }
  return `${imageProps.src ? `${validate_component(Image, "Image").$$render(
    $$result,
    Object_1.assign({}, imageProps, { cdn: "cloudinary" }, {
      transformer: (loaderOptions) => {
        return cloudinaryLoader({
          loaderOptions,
          imageProps,
          cldOptions: { ...cldOptions, width: imageProps.width },
          cldConfig: config
        });
      }
    }),
    {},
    {}
  )}` : ``}`;
});
const EMBLA_CAROUSEL_CONTEXT = Symbol("EMBLA_CAROUSEL_CONTEXT");
function setEmblaContex(config) {
  setContext(EMBLA_CAROUSEL_CONTEXT, config);
  return config;
}
function getEmblaContext(name2 = "This component") {
  if (!hasContext(EMBLA_CAROUSEL_CONTEXT)) {
    throw new Error(`${name2} must be used within a <Carousel.Root> component`);
  }
  return getContext(EMBLA_CAROUSEL_CONTEXT);
}
const Carousel = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["opts", "plugins", "api", "orientation", "class"]);
  let { opts = {} } = $$props;
  let { plugins = [] } = $$props;
  let { api = void 0 } = $$props;
  let { orientation = "horizontal" } = $$props;
  let { class: className = void 0 } = $$props;
  const apiStore = writable(void 0);
  const orientationStore = writable(orientation);
  const canScrollPrev = writable(false);
  const canScrollNext = writable(false);
  const optionsStore = writable(opts);
  const pluginStore = writable(plugins);
  function scrollPrev() {
    api?.scrollPrev();
  }
  function scrollNext() {
    api?.scrollNext();
  }
  function onSelect(api2) {
    if (!api2)
      return;
    canScrollPrev.set(api2.canScrollPrev());
    canScrollNext.set(api2.canScrollNext());
  }
  function handleKeyDown(e) {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      scrollPrev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      scrollNext();
    }
  }
  setEmblaContex({
    api: apiStore,
    scrollPrev,
    scrollNext,
    orientation: orientationStore,
    canScrollNext,
    canScrollPrev,
    handleKeyDown,
    options: optionsStore,
    plugins: pluginStore,
    onInit
  });
  function onInit(event) {
    api = event.detail;
    apiStore.set(api);
  }
  onDestroy(() => {
    api?.off("select", onSelect);
  });
  if ($$props.opts === void 0 && $$bindings.opts && opts !== void 0)
    $$bindings.opts(opts);
  if ($$props.plugins === void 0 && $$bindings.plugins && plugins !== void 0)
    $$bindings.plugins(plugins);
  if ($$props.api === void 0 && $$bindings.api && api !== void 0)
    $$bindings.api(api);
  if ($$props.orientation === void 0 && $$bindings.orientation && orientation !== void 0)
    $$bindings.orientation(orientation);
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  {
    orientationStore.set(orientation);
  }
  {
    pluginStore.set(plugins);
  }
  {
    optionsStore.set(opts);
  }
  {
    if (api) {
      onSelect(api);
      api.on("select", onSelect);
      api.on("reInit", onSelect);
    }
  }
  return `<div${spread(
    [
      {
        class: escape_attribute_value(cn("relative", className))
      },
      { role: "region" },
      { "aria-roledescription": "carousel" },
      escape_object($$restProps)
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</div>`;
});
const Carousel_content = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let $$unsubscribe_options;
  let $orientation, $$unsubscribe_orientation;
  let $$unsubscribe_plugins;
  let { class: className = void 0 } = $$props;
  const { orientation, options, plugins, onInit } = getEmblaContext("<Carousel.Content/>");
  $$unsubscribe_orientation = subscribe(orientation, (value) => $orientation = value);
  $$unsubscribe_options = subscribe(options, (value) => value);
  $$unsubscribe_plugins = subscribe(plugins, (value) => value);
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  $$unsubscribe_options();
  $$unsubscribe_orientation();
  $$unsubscribe_plugins();
  return `<div class="overflow-hidden"><div${spread(
    [
      {
        class: escape_attribute_value(cn(
          "flex",
          $orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
          className
        ))
      },
      { "data-embla-container": "" },
      escape_object($$restProps)
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</div></div>`;
});
const Carousel_item = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let $orientation, $$unsubscribe_orientation;
  let { class: className = void 0 } = $$props;
  const { orientation } = getEmblaContext("<Carousel.Item/>");
  $$unsubscribe_orientation = subscribe(orientation, (value) => $orientation = value);
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  $$unsubscribe_orientation();
  return `<div${spread(
    [
      { role: "group" },
      { "aria-roledescription": "slide" },
      {
        class: escape_attribute_value(cn("min-w-0 shrink-0 grow-0 basis-full", $orientation === "horizontal" ? "pl-4" : "pt-4", className))
      },
      { "data-embla-slide": "" },
      escape_object($$restProps)
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</div>`;
});
const Carousel_previous = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class", "variant", "size", "arrowClass"]);
  let $orientation, $$unsubscribe_orientation;
  let $canScrollPrev, $$unsubscribe_canScrollPrev;
  let { class: className = void 0 } = $$props;
  let { variant = "outline" } = $$props;
  let { size = "icon" } = $$props;
  let { arrowClass = "w-4 h-4" } = $$props;
  const { orientation, canScrollPrev, scrollPrev, handleKeyDown } = getEmblaContext("<Carousel.Previous/>");
  $$unsubscribe_orientation = subscribe(orientation, (value) => $orientation = value);
  $$unsubscribe_canScrollPrev = subscribe(canScrollPrev, (value) => $canScrollPrev = value);
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.variant === void 0 && $$bindings.variant && variant !== void 0)
    $$bindings.variant(variant);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.arrowClass === void 0 && $$bindings.arrowClass && arrowClass !== void 0)
    $$bindings.arrowClass(arrowClass);
  $$unsubscribe_orientation();
  $$unsubscribe_canScrollPrev();
  return `${validate_component(Button, "Button").$$render(
    $$result,
    Object.assign(
      {},
      { variant },
      { size },
      {
        class: cn(
          "absolute h-8 w-8 rounded-full touch-manipulation",
          $orientation === "horizontal" ? "-left-12 top-1/2 -translate-y-1/2" : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
          className
        )
      },
      { disabled: !$canScrollPrev },
      $$restProps
    ),
    {},
    {
      default: () => {
        return `${validate_component(ChevronLeft, "ChevronLeft").$$render($$result, { class: arrowClass }, {}, {})} <span class="sr-only" data-svelte-h="svelte-1tx67gn">Previous slide</span>`;
      }
    }
  )}`;
});
const Carousel_next = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class", "variant", "size", "arrowClass"]);
  let $orientation, $$unsubscribe_orientation;
  let $canScrollNext, $$unsubscribe_canScrollNext;
  let { class: className = void 0 } = $$props;
  let { variant = "outline" } = $$props;
  let { size = "icon" } = $$props;
  let { arrowClass = "w-4 h-4" } = $$props;
  const { orientation, canScrollNext, scrollNext, handleKeyDown } = getEmblaContext("<Carousel.Next/>");
  $$unsubscribe_orientation = subscribe(orientation, (value) => $orientation = value);
  $$unsubscribe_canScrollNext = subscribe(canScrollNext, (value) => $canScrollNext = value);
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.variant === void 0 && $$bindings.variant && variant !== void 0)
    $$bindings.variant(variant);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.arrowClass === void 0 && $$bindings.arrowClass && arrowClass !== void 0)
    $$bindings.arrowClass(arrowClass);
  $$unsubscribe_orientation();
  $$unsubscribe_canScrollNext();
  return `${validate_component(Button, "Button").$$render(
    $$result,
    Object.assign(
      {},
      { variant },
      { size },
      {
        class: cn(
          "absolute h-8 w-8 rounded-full touch-manipulation",
          $orientation === "horizontal" ? "-right-12 top-1/2 -translate-y-1/2" : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
          className
        )
      },
      { disabled: !$canScrollNext },
      $$restProps
    ),
    {},
    {
      default: () => {
        return `${validate_component(ChevronRight, "ChevronRight").$$render($$result, { class: arrowClass }, {}, {})} <span class="sr-only" data-svelte-h="svelte-vmesmf">Next slide</span>`;
      }
    }
  )}`;
});
export {
  Carousel as C,
  Carousel_content as a,
  Carousel_item as b,
  Carousel_next as c,
  Carousel_previous as d,
  CldImage as e
};
