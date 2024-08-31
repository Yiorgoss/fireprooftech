<script lang="ts">
	import { page } from '$app/stores';
	import { withoutLanguageTag } from '$lib/i18n-routing';
	import { siteMap } from '$lib/siteConfig';
	import * as m from '$pg/messages';

	import Navbar from '$lib/components/navbar.svelte';
	import Footer from '$lib/components/footer.svelte';

	export const mainNav = [
		{ slug: '/', title: m.home() },
		{ slug: siteMap.aboutUs, title: m.about_us() },
		{ slug: siteMap.products, title: m.products() },
		{ slug: siteMap.contactUs, title: m.contact_us() }
	];

	// $: textColor =
		// (withoutLanguageTag($page.url.pathname) == '/' || withoutLanguageTag($page.url.pathname) == "/about-us") ? 'text-foreground' : 'text-background';
	$: footerTextColor =
		withoutLanguageTag($page.url.pathname) == '/'  ? 'text-foreground' : 'text-background';
</script>

<Navbar textColor={footerTextColor} {mainNav} />
<main class="font-gothic text-xl leading-10 tracking-wider">
	<slot />
</main>
<Footer {mainNav} textColor={footerTextColor} />
