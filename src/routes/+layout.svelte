<script lang='ts'>
	import '../app.pcss';

  import { page } from "$app/stores";
  import { setLanguageTag, sourceLanguageTag, type AvailableLanguageTag } from "$pg/runtime";
  import {browser} from "$app/environment";
	import LangSwitcher from '$lib/components/lang-switcher.svelte';
	import I18nHeader from '$lib/components/i18n-header.svelte';
	import { isRTL } from '$lib/i18n-routing';

  //Use the default language if no language is given
  $: lang = $page.params.lang as AvailableLanguageTag ?? sourceLanguageTag;
  // $: console.log({lang:lang})
  $: setLanguageTag(lang);
  $: if(browser) document.documentElement.lang = lang;
  $: if(browser) document.documentElement.dir = isRTL(lang) ? 'rtl' : 'ltr';

</script>

<I18nHeader />
<LangSwitcher />
{#key lang}
  <slot/>
{/key}
