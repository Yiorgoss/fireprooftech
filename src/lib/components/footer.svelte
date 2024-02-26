<script lang="ts">
	import * as m from '$pg/messages';
	import { socials, contactInfo } from '$lib/siteConfig';
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
	<div class="items-top flex flex-col md:flex-row flex-wrap items-start md:items-center rtl:pr-10 ltr:pl-10 md:pl-0 justify-around">
		<div class="flex basis-full items-center justify-center md:basis-0 w-full rtl:pl-10 ltr:pr-10">
			<div class="h-[100px] w-[100px]">
				{#if isHome}
					<img src={logo_black} alt="logo" />
				{:else}
					<img src={logo_white} alt="logo" />
				{/if}
			</div>
		</div>
		<div class="">
			<h4 class="py-5 text-center font-playfair text-xl md:text-left">{m.find_us()}</h4>
			<ul>
				{#each socials as { name, href }}
					<li>
						<a class=" flex justify-between gap-x-10 py-2" {href}>
							<svelte:component this={icons[name]} />
							<p class="">{name}</p>
						</a>
					</li>
				{/each}
			</ul>
		</div>
		<div class="">
			<h4 class="py-5 text-center font-playfair text-xl md:text-left">{m.contact_us()}</h4>
			<ul>
				{#each contactInfo as { info, icon, href }}
					<li>
						<a class=" flex justify-between gap-x-10 py-2" {href}>
							<svelte:component this={icons[icon]} />
							<p>{info}</p>
						</a>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</div>
