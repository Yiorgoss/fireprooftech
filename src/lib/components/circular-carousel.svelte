<script lang="ts">
	import * as Carousel from '$lib/components/ui/carousel/index.js';
	import type { CarouselAPI } from '$lib/components/ui/carousel/context.js';
	import { CldImage } from 'svelte-cloudinary';

	let api: CarouselAPI;
	let current = 0;
	let count = 0;

	$: if (api) {
		count = api.scrollSnapList().length;
		current = api.selectedScrollSnap() + 1;
		api.on('select', () => {
			// console.log('current');
			current = api.selectedScrollSnap() + 1;
		});
	}

	export let images: string[] = [];
</script>

<div class="">
	<Carousel.Root bind:api orientation="vertical" class="flex min-h-[300px] w-full min-w-[300px] ">
		<Carousel.Content class="mt-0 basis-1/6 gap-5 md:gap-5">
			{#each images as image, i}
				<Carousel.Item
					class="px-3 grayscale transition-transform duration-200 hover:scale-125 hover:grayscale-0 "
				>
					<button
						class:text-foreground-muted={current != i}
						class="flex aspect-square items-center justify-center "
						on:click={() => (current = i)}
					>
						<span class="overflow-hidden rounded-full text-4xl font-semibold">
							<CldImage class="" src={image} height={150} width={150} alt="test" />
						</span>
					</button>
				</Carousel.Item>
			{/each}
		</Carousel.Content>
		<!-- <div class="absolute bottom-1/4 right-1/4 bg-blue-300"> -->
		<!-- 	<Carousel.Previous /> -->
		<!-- 	<Carousel.Next /> -->
		<!-- </div> -->
		<div class="flex w-full items-center justify-center">
			<CldImage
				class="rounded-full object-cover border-8 border-foreground-blue"
				src={images[current]}
				height={400}
				width={400}
				alt="test"
			/>
		</div>
	</Carousel.Root>
</div>
