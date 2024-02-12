const sourceLanguageTag = "en";
const availableLanguageTags = (
  /** @type {const} */
  ["en", "il"]
);
let languageTag = () => sourceLanguageTag;
const setLanguageTag = (tag) => {
  if (typeof tag === "function") {
    languageTag = enforceLanguageTag(tag);
  } else {
    languageTag = enforceLanguageTag(() => tag);
  }
};
function enforceLanguageTag(unsafeLanguageTag) {
  return () => {
    const tag = unsafeLanguageTag();
    if (!isAvailableLanguageTag(tag)) {
      throw new Error(`languageTag() didn't return a valid language tag. Check your setLanguageTag call`);
    }
    return tag;
  };
}
function isAvailableLanguageTag(thing) {
  return availableLanguageTags.includes(thing);
}
export {
  availableLanguageTags as a,
  setLanguageTag as b,
  languageTag as l,
  sourceLanguageTag as s
};
