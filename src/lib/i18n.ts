import { createI18n } from "@inlang/paraglide-js-adapter-sveltekit"
import * as runtime from "$pg/runtime"

export const i18n = createI18n(runtime, {
  textDirection: {
    en: "ltr",
    il: "rtl",
  },
})

