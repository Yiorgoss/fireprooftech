import type { Handle } from '@sveltejs/kit';
import { sourceLanguageTag } from "$pg/runtime"
import { isRTL } from "$lib/i18n-routing"

// import { i18n } from '$lib/i18n.js'
// export const handle = i18n.handle()


export const handle: Handle = async ({ event, resolve }) => {
  const langTmp = event.params.lang ?? sourceLanguageTag

  const dir = isRTL(langTmp) ? 'rtl' : 'ltr'

  console.log(langTmp)
  const lang = langTmp == 'il' ? 'he' : langTmp
  console.log(lang)

  return await resolve(event, {
    transformPageChunk({ done, html }) {
      //Only do it at the very end of the rendering process
      if (done) {
        return html.replace("%lang%", lang).replace("%dir%", dir)
      }
    },
  })
}
