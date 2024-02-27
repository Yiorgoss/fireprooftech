<script lang="ts">
	import * as m from '$pg/messages';
	import { socials, contactInfo, mainNav } from '$lib/siteConfig';
	import { icons } from '$lib/components/icons';
	import { page } from '$app/stores';
	import { withoutLanguageTag } from '$lib/i18n-routing';
	import logo_black from '$lib/assets/logos/fpt_logo.svg';
	import logo_white from '$lib/assets/logos/fpt_logo_white.svg';

	let isHome = true;

	$: isHome = withoutLanguageTag($page.url.pathname) == '/';
	export let textColor: string;
</script>

<div
	class={`${isHome ? 'bg-background' : 'bg-foreground'} w-full border-t-2 border-black ${textColor} py-10`}
>
	<div
		class="items-top flex flex-col flex-wrap items-start justify-around md:flex-row md:items-start ltr:pl-10 ltr:md:pl-0 rtl:pr-10"
	>
		<div
			class="flex w-full basis-full items-center justify-center self-center md:basis-0 ltr:pr-10 rtl:pl-10"
		>
			<div class="h-[150px] w-[150px]">
				{#if isHome}
					<img src={logo_black} alt="logo" />
				{:else}
					<img src={logo_white} alt="logo" />
				{/if}
			</div>
		</div>
		<div class="">
			<h4 class="pt-10 font-playfair text-2xl text-start">{m.sitemap()}</h4>
			<ul>
				{#each mainNav as { title, slug }}
					<li>
						<a class=" flex justify-between gap-x-10 py-2" href={slug}>
							<p class="underline underline-offset-2">{title}</p>
							<!-- <svelte:component this={icons[name]} /> -->
						</a>
					</li>
				{/each}
			</ul>
		</div>
		<div class="">
			<h4 class="pt-10 text-start font-playfair text-2xl">{m.find_us()}</h4>
			<ul>
				{#each socials as { name, href }}
					<li>
						<a class=" flex justify-between gap-x-10 py-2" {href}>
							<p class="">{name}</p>
							<svelte:component this={icons[name]} />
						</a>
					</li>
				{/each}
			</ul>
		</div>
		<div class="">
			<h4 class="pt-10 font-playfair text-2xl text-start">{m.contact_us()}</h4>
			<ul>
				{#each contactInfo as { info, icon, href }}
					<li>
						<a class=" flex justify-between gap-x-10 py-2" {href}>
							<p>{info}</p>
							<svelte:component this={icons[icon]} />
						</a>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</div>
