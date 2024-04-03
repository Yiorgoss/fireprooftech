<!-- <script lang='ts'> -->
<!---->
<!--   import { page } from "$app/stores"; -->
<!--   import { setLanguageTag, sourceLanguageTag, type AvailableLanguageTag } from "$pg/runtime"; -->
<!--   import {browser} from "$app/environment"; -->
<!-- 	import I18nHeader from '$lib/components/i18n-header.svelte'; -->
<!-- 	import { isRTL } from '$lib/i18n-routing'; -->
<!---->
<!--   //Use the default language if no language is given -->
<!--   $: lang = $page.params.lang as AvailableLanguageTag ?? sourceLanguageTag; -->
<!--   $: setLanguageTag(lang); -->
<!--   $: if(browser) document.documentElement.lang = lang; -->
<!--   $: if(browser) document.documentElement.dir = isRTL(lang) ? 'rtl' : 'ltr'; -->
<!---->
<!-- </script> -->
<!---->
<!-- <I18nHeader /> -->
<!-- {#key lang} -->
<!--   <slot/> -->
<!-- {/key} -->

<script>
  import '../app.pcss';
	import { ParaglideJS } from '@inlang/paraglide-js-adapter-sveltekit';
	import { i18n } from '$lib/i18n';
</script>

<ParaglideJS {i18n}>
	<slot />
</ParaglideJS>
  <!-- Cloudflare Web Analytics -->
  <script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "c7ded2865f234444a6f8ddc0392ed297"}'></script>
<!-- End Cloudflare Web Analytics -->
