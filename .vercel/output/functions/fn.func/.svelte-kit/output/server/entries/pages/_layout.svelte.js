import { c as create_ssr_component, a as subscribe, e as each, b as add_attribute, v as validate_component } from "../../chunks/ssr.js";
import { p as page } from "../../chunks/stores.js";
import { a as availableLanguageTags, s as sourceLanguageTag, b as setLanguageTag } from "../../chunks/runtime.js";
import { r as route } from "../../chunks/i18n-routing.js";
const I18n_header = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$unsubscribe_page();
  return `${$$result.head += `<!-- HEAD_svelte-mcb845_START -->${each(availableLanguageTags, (lang) => {
    return `<link rel="alternate"${add_attribute("hreflang", lang, 0)}${add_attribute("href", route($page.url.pathname, lang), 0)}>`;
  })}<!-- HEAD_svelte-mcb845_END -->`, ""}`;
});
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let lang;
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  lang = $page.params.lang ?? sourceLanguageTag;
  {
    setLanguageTag(lang);
  }
  $$unsubscribe_page();
  return `${validate_component(I18n_header, "I18nHeader").$$render($$result, {}, {}, {})} ${slots.default ? slots.default({}) : ``}`;
});
export {
  Layout as default
};
