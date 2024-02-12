import { a as availableLanguageTags, s as sourceLanguageTag } from "./runtime.js";
function route(path, lang) {
  path = withoutLanguageTag(path);
  if (lang === sourceLanguageTag)
    return path;
  return `/${lang}${path}`;
}
function withoutLanguageTag(path) {
  const [_, maybeLang, ...rest] = path.split("/");
  if (availableLanguageTags.includes(maybeLang)) {
    return `/${rest.join("/")}`;
  }
  return path;
}
const isRTL = (tag) => {
  const rtl = /* @__PURE__ */ new Set(["il"]);
  return rtl.has(tag);
};
export {
  isRTL as i,
  route as r,
  withoutLanguageTag as w
};
