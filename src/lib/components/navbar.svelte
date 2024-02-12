<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import LangSwitcher from './lang-switcher.svelte';
	import { PhoneCall, Menu } from 'lucide-svelte';
	import { mainNav } from '$lib/siteConfig';
	import * as m from '$pg/messages';
	import { page } from '$app/stores';
	import { withoutLanguageTag } from '$lib/i18n-routing';

	export let pathColors: string;

	let openMenu = false;

	let header: HTMLElement;
	let isHome = withoutLanguageTag($page.url.pathname) == '/';

	const handleMobileIconClick = () => (openMenu = !openMenu);

	const handleOutsideClick = (event: MouseEvent) => {
		if (!header.contains(event.target as HTMLDivElement)) {
			openMenu = false;
		}
	};
</script>

<svelte:window on:click={handleOutsideClick} />
<header
	bind:this={header}
	class={`${pathColors} relative z-30 flex h-[100px] w-full justify-between md:justify-around`}
>
	<a href="/" class="h-[100px] w-[100px] p-5 md:p-2">
		{#if isHome}
			<img src="/logos/fpt_logo.svg" alt="logo" />
		{:else}
			<img src="/logos/fpt_logo_white.svg" alt="logo" />
		{/if}
	</a>
	<nav
		class:ltr:right-[200vw]={!openMenu}
		class:rtl:left-[200vw]={!openMenu}
		class="fixed bottom-0 left-0 right-1/4 top-0 h-screen overflow-hidden bg-inherit transition-all duration-500 md:static md:right-0 md:h-full md:bg-transparent rtl:left-1/4 rtl:right-0"
	>
		<ul
			class="flex h-full flex-col items-start justify-start bg-blue-600/40 md:flex-row md:items-center md:justify-center md:bg-transparent md:pl-0 md:pt-0 ltr:pl-20 rtl:pr-20"
		>
			<div class="py-[100px] md:hidden">
				<div class="h-[100px] w-[100px] p-5 md:p-2">
					{#if isHome}
						<img src="/logos/fpt_logo.svg" alt="logo" />
					{:else}
						<img src="/logos/fpt_logo_white.svg" alt="logo" />
					{/if}
				</div>
			</div>
			{#each mainNav as { slug, title }}
				<li class="px-3 py-4 text-lg">
					<a on:click={() => (openMenu = false)} href={slug}> {title}</a>
				</li>
			{/each}
			<li class="md:order-first">
				<LangSwitcher />
			</li>
		</ul>
	</nav>
	<div class="float-right flex items-center justify-center md:float-none md:h-full">
		<Button class="hidden items-center gap-3 md:flex">
			<PhoneCall />{m.contact_us()}
		</Button>
		<Button
			variant="ghost"
			class="inline bg-transparent hover:bg-transparent md:hidden"
			on:click={handleMobileIconClick}
		>
			<Menu class={pathColors} />
		</Button>
	</div>
</header>
