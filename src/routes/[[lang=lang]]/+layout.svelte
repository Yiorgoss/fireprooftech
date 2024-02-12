<script lang="ts">
	import { page } from '$app/stores';
	import { withoutLanguageTag } from '$lib/i18n-routing';
	import Navbar from '$lib/components/navbar.svelte';
	import Footer from '$lib/components/footer.svelte';

	// $: console.log(withoutLanguageTag($page.url.pathname));
	$: pathColors =
		withoutLanguageTag($page.url.pathname) == '/'
			? 'bg-background text-foreground'
			: 'bg-foreground text-background';
</script>

<Navbar {pathColors} />
<main class="">
	<slot />
</main>
<Footer {pathColors} />
