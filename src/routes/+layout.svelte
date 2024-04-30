<!-- <script lang='ts'> -->
<!---->
<!-- import { page } from "$app/stores"; -->
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
	import { page } from '$app/stores';
	import { onSetLanguageTag, sourceLanguageTag } from '$pg/runtime';
	import { ParaglideJS } from '@inlang/paraglide-js-adapter-sveltekit';
	import { i18n } from '$lib/i18n';

  let lang = sourceLanguageTag
  onSetLanguageTag((ll)=> lang = ll)
</script>

<ParaglideJS {i18n}>
		<slot />
</ParaglideJS>
