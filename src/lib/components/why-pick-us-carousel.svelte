<script lang="ts">
	import * as Carousel from '$lib/components/ui/carousel';
	import type { CarouselAPI } from '$lib/components/ui/carousel/context.js';
	import * as m from '$pg/messages';
	import clock from '$lib/assets/icons/clock.svg';
	import checkmark from '$lib/assets/icons/checkmark.svg';
	import leaves from '$lib/assets/icons/leaves.svg';
	import { page } from '$app/stores';
	import { languageTag } from '$pg/runtime';

	let api: CarouselAPI;
	let current = 0;
	let count = 0;

	$: if (api) {
		count = api.scrollSnapList().length;
		current = api.selectedScrollSnap() + 1;
		api.on('select', () => {
			current = api.selectedScrollSnap() + 1;
		});
	}
  const dir = languageTag() == 'il' ? 'rtl' as const: 'ltr' as const

	// console.log(event.locals);
	 const opts = {direction: dir }

	const reasons = [
		{
			src: clock,
			title: m.home_page_why_pick_us_one_subheading(),
			description: m.home_page_why_pick_us_one_description()
		},
		{
			src: checkmark,
			title: m.home_page_why_pick_us_two_subheading(),
			description: m.home_page_why_pick_us_two_description()
		},
		{
			src: leaves,
			title: m.home_page_why_pick_us_three_subheading(),
			description: m.home_page_why_pick_us_three_description()
		}
	];
</script>

<Carousel.Root class="mx-auto w-full rounded-sm bg-off-blue py-8 md:w-2/3 " opts={opts} bind:api>
	<Carousel.Content class="relative px-3 py-5 ">
		{#each reasons as { src, title, description }}
			<Carousel.Item class="flex flex-col items-center  justify-center md:flex-row">
				<img class="w-1/3" {src} alt="decorative" />
				<div class="flex w-2/3 flex-col items-center justify-center p-1 text-center">
					<h4 class="font-playfair text-2xl">{title}</h4>
					<p class="text-lg">{description}</p>
				</div>
			</Carousel.Item>
		{/each}
	</Carousel.Content>
	<div class="absolute inset-x-0 bottom-0 mx-auto flex w-1/2 justify-center py-2">
		{#each Array(count) as _, i}
			<div class="flex items-center justify-center">
				<button
					on:click={() => api.scrollTo(i)}
					class:border-2={i == current - 1}
					class:font-bold={i == current - 1}
					class:scale-110={i == current - 1}
					class="flex h-5 w-5 items-center justify-center rounded-full border border-black p-4"
				>
					{i + 1}
				</button>
				{#if count != i + 1}
					<div class="w-5 border-t border-black"></div>
				{/if}
			</div>
		{/each}
	</div>
</Carousel.Root>
