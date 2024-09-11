<script lang="ts">
	import * as m from '$pg/messages';
	import { socials, contactInfo } from '$lib/siteConfig';
	import { icons } from '$lib/components/icons';
	import { page } from '$app/stores';
	import { withoutLanguageTag } from '$lib/i18n-routing';
	import logo_black from '$lib/assets/logos/fpt_logo.svg';
	import logo_white from '$lib/assets/logos/fpt_logo_white.svg';

	let isHome = true;
	export let mainNav: { slug: string; title: string }[];

	$: isHome = withoutLanguageTag($page.url.pathname) == '/';
	export let textColor: string;

	let isIL = true;
	if ($page.url.pathname.split('/')[1] == 'en') isIL = false;
</script>

<div
	class={`${isHome ? 'border-foreground bg-background' : 'border-background bg-foreground'} w-full border-y-8 ${textColor} pb-20 pt-10 md:pb-10`}
>
	<div
		class="items-top flex flex-col flex-wrap items-center justify-around md:flex-row md:items-start"
	>
		<div class="flex w-full basis-full items-center justify-center self-center md:basis-0">
			<div class="h-[200px] w-[200px]">
				{#if isHome}
					<img src={logo_black} alt="logo" />
				{:else}
					<img src={logo_white} alt="logo" />
				{/if}
			</div>
		</div>
		<div class="">
			<h4 class="pb-4 pt-10 text-start font-playfair text-2xl">{m.sitemap()}</h4>
			<ul class="flex flex-col items-center justify-center opacity-70">
				{#each mainNav as { title, slug }}
					<li>
						<a class=" flex justify-between gap-x-10 py-2" href={slug}>
							<p class="block underline-offset-2">{title}</p>
							<!-- <svelte:component this={icons[name]} /> -->
						</a>
					</li>
				{/each}
			</ul>
		</div>
		<div class="flex flex-col items-center justify-center">
			<h4 class="pb-4 pt-10 text-start font-playfair text-2xl">{m.find_us()}</h4>
			<ul class="opacity-70">
				{#each socials as { name, href }}
					<li>
						<a class=" flex justify-start gap-x-10 py-2" {href}>
							<svelte:component this={icons[name]} />
							<!-- <p class="">{name}</p> -->
						</a>
					</li>
				{/each}
			</ul>
		</div>
		<div class="flex flex-col items-center justify-center">
			<h4 class="pb-4 pt-10 text-start font-playfair text-2xl">{m.contact_us()}</h4>
			<ul class="opacity-70">
				{#each contactInfo as { info, icon, href }}
					<li class="">
						<a class=" flex justify-center gap-x-3 py-2 md:justify-start" {href}>
							<svelte:component this={icons[icon]} />
							{#if icon == 'Phone'}
								<span class="" dir="ltr">{info}</span>
							{:else}
								{icon == 'Map' && isIL == true ?  'כתובת הסדנה 8, חולון' : info}
							{/if}
						</a>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</div>
