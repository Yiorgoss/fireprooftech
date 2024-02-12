import { s as sourceLanguageTag } from "./runtime.js";
import { i as isRTL } from "./i18n-routing.js";
const handle = async ({ event, resolve }) => {
  const lang = event.params.lang ?? sourceLanguageTag;
  const dir = isRTL(lang) ? "rtl" : "ltr";
  return await resolve(event, {
    transformPageChunk({ done, html }) {
      if (done) {
        return html.replace("%lang%", lang).replace("%dir%", dir);
      }
    }
  });
};
export {
  handle
};
