<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import LangSwitcher from './lang-switcher.svelte';
	import { PhoneCall, Menu } from 'lucide-svelte';
	import { contactInfo } from '$lib/siteConfig';
	import * as m from '$pg/messages';
	import { i18n } from '$lib/i18n';
	import { page } from '$app/stores';
	import { withoutLanguageTag } from '$lib/i18n-routing';
	import logo_black from '$lib/assets/logos/fpt_logo.svg';
	import logo_white from '$lib/assets/logos/fpt_logo_white.svg';

	export let textColor: string;

	let openMenu = false;

	let header: HTMLElement;
	let isHome = true;
  export let mainNav:{slug:string,title:string}[];

	$: isHome = withoutLanguageTag($page.url.pathname) == '/';

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
	class={`${textColor} relative z-30 flex h-[100px] w-full justify-between bg-transparent font-playfair tracking-wide md:justify-around`}
>
	<a href="/" class=" h-[110px] w-[110px] md:p-2">
		{#if isHome}
			<img src={logo_black} alt="logo" />
		{:else}
			<img src={logo_white} alt="logo" />
		{/if}
	</a>
	<nav
		class:ltr:right-[25%]={openMenu}
		class:rtl:left-[25%]={openMenu}
		class="fixed bottom-0 left-0 right-[200vw] top-0 h-screen overflow-hidden bg-inherit transition-all duration-500 md:static md:right-0 md:h-full md:bg-transparent rtl:left-[200vw] rtl:right-0"
	>
		<ul
			class:border-none={!openMenu}
			class={`${isHome ? 'border-foreground bg-background ltr:border-r rtl:border-l' : 'border-background bg-foreground ltr:border-r rtl:border-l '} flex h-full flex-col items-start justify-start md:flex-row md:items-center md:justify-center md:bg-transparent md:pl-0 md:pt-0 ltr:pl-20 rtl:pr-20`}
		>
			<div class=" md:hidden">
				<div class="h-[100px] w-[100px] p-5 md:p-2">
					{#if isHome}
						<img src={logo_black} alt="logo" />
					{:else}
						<img src={logo_white} alt="logo" />
					{/if}
				</div>
			</div>
			{#each mainNav as { slug, title }}
				<li class="px-4 py-4 text-lg">
					<a on:click={() => (openMenu = false)} class=" text-xl" href={i18n.route(slug)}>
						{title}
          </a>
				</li>
			{/each}
			<li class="md:order-first">
				<LangSwitcher />
			</li>
		</ul>
	</nav>
	<div class="float-right flex items-center justify-center md:float-none md:h-full">
			<a href={contactInfo[0].href}>
		<Button class="hidden items-center gap-3 px-5 py-3 font-gothic text-lg md:flex">
				<PhoneCall />{contactInfo[0].info}
		</Button>
			</a>
		<Button
			variant="ghost"
			class="inline bg-transparent hover:bg-transparent md:hidden"
			on:click={handleMobileIconClick}
		>
			<Menu class={`${textColor} fixed ltr:right-8 rtl:left-8`} />
		</Button>
	</div>
</header>
