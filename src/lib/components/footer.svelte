<script lang="ts">
	import * as m from '$pg/messages';
	import { socials, contactInfo } from '$lib/siteConfig';
	import { icons } from '$lib/components/icons';
	import { page } from '$app/stores';
	import { withoutLanguageTag } from '$lib/i18n-routing';

	let isHome = true;

  $:isHome = withoutLanguageTag($page.url.pathname) == '/';
	export let pathColors: string;
</script>

<div class={` w-full border-t-2 border-black ${pathColors} py-10`}>
	<div class="items-top flex flex-wrap items-center justify-around">
		<div class="flex basis-full items-center justify-center md:basis-0">
			<div class="h-[100px] w-[100px]">
				{#if isHome}
					<img src="/logos/fpt_logo.svg" alt="logo" />
				{:else}
					<img src="/logos/fpt_logo_white.svg" alt="logo" />
				{/if}
			</div>
		</div>
		<div class="">
			<h4 class="py-5 text-xl text-center md:text-left">{m.find_us()}</h4>
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
			<h4 class="text-center md:text-left py-5 text-xl">{m.contact_us()}</h4>
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
