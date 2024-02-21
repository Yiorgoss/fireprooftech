<script lang="ts">
	import { page } from '$app/stores';
	import { withoutLanguageTag } from '$lib/i18n-routing';
	import Navbar from '$lib/components/navbar.svelte';
	import Footer from '$lib/components/footer.svelte';

	// $: console.log(withoutLanguageTag($page.url.pathname));
	$: textColor =
		withoutLanguageTag($page.url.pathname) == '/'
			? 'text-foreground'
			: 'text-background';
</script>

<Navbar textColor={textColor} />
<main class="font-gothic text-xl">
	<slot />
</main>
<Footer textColor={textColor} />
