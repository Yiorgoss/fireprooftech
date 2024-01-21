<script lang="ts">
	import { availableLanguageTags } from '$pg/runtime';
	import { page } from '$app/stores';
	import { route } from '$lib/i18n-routing';

  
  // console.log("-->",console.log(route('/',availableLanguageTags[0])))
</script>

<div class="flex gap-5">
	{#each availableLanguageTags as lang}
		<a href={route($page.url.pathname, lang)} hreflang={lang}>{lang}</a>
	{/each}
</div>
