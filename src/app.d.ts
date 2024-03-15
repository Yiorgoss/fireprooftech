// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      i18n: {
        lang: string,
        dir: string
      }
    }
    // interface PageData {}
    // interface Platform {}
  }
}

export { };
