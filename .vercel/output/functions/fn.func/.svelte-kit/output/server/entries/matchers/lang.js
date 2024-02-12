import { a as availableLanguageTags } from "../../chunks/runtime.js";
const match = (param) => {
  return availableLanguageTags.includes(param);
};
export {
  match
};
