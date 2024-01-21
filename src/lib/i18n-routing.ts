import {
  sourceLanguageTag,
  type AvailableLanguageTag,
  availableLanguageTags,
} from "$pg/runtime"

/**
 * Returns the path in the given language, regardless of which language the path is in.
 */
export function route(path: string, lang: AvailableLanguageTag) {

  // console.log({ "path": path })
  path = withoutLanguageTag(path)
  // console.log({ "path2": path })

  // Don't prefix the default language
  if (lang === sourceLanguageTag) return path

  // Prefix all other languages
  return `/${lang}${path}`
}

/**
 * Returns the path without the language tag
 */
function withoutLanguageTag(path: string) {
  const [_, maybeLang, ...rest] = path.split("/")
  if (availableLanguageTags.includes(maybeLang as AvailableLanguageTag)) {
    return `/${rest.join('/')}`
  }
  return path
}


export const isRTL = (tag: string): boolean => {
  const rtl = new Set<string>(['he'])
  console.log('has tag', rtl.has(tag))
  return rtl.has(tag)
}

