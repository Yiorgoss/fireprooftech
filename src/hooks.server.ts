import type { Handle } from '@sveltejs/kit';
import { sourceLanguageTag } from "$pg/runtime"
import { isRTL } from "$lib/i18n-routing"

export const handle: Handle = async ({ event, resolve }) => {
  const lang = event.params.lang ?? sourceLanguageTag
  const dir = isRTL(lang) ? 'rtl' : 'ltr'

  return await resolve(event, {
    transformPageChunk({ done, html }) {
      //Only do it at the very end of the rendering process
      if (done) {
        return html.replace("%lang%", lang).replace("%dir%", dir)
      }
    },
  })
}
