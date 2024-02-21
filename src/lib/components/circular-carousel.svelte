<script lang="ts">
	import * as Carousel from '$lib/components/ui/carousel/index.js';
	import type { CarouselAPI } from '$lib/components/ui/carousel/context.js';
	import { ImageWrapper, type ImgMetaType } from '$lib/components/image-wrapper';

	let api: CarouselAPI;
	let current = 0;
	let count = 0;

	$: mainImg = images[current];
	// $: console.log(mainImg);

	$: if (api) {
		count = api.scrollSnapList().length;
		current = api.selectedScrollSnap() + 1;
		api.on('select', () => {
			current = api.selectedScrollSnap() + 1;
		});
	}

	export let images: ImgMetaType[] = [];
</script>

<div class="">
	<Carousel.Root bind:api orientation="vertical" class="flex  w-full  ">
		<Carousel.Content class="mt-0 basis-1/3 gap-5 md:gap-5">
			{#each images as image, i}
				<Carousel.Item
					class={`${current == i ? 'scale-110 grayscale-0' : 'grayscale'} px-5 transition-transform duration-200  hover:scale-125 hover:grayscale-0`}
				>
					<button
						class:text-foreground-muted={current != i}
						class="flex h-full w-full items-center justify-center"
						on:click={() => (current = i)}
					>
						<div class="aspect-square h-full w-full text-4xl font-semibold">
							<ImageWrapper
								imageClass="rounded-full max-w-[100px] w-full h-full object-stretch aspect-square"
								sizes="10vw"
								meta={[image]}
								alt="landing hero image"
							/>
						</div>
					</button>
				</Carousel.Item>
			{/each}
		</Carousel.Content>
		<!-- <div class="absolute bottom-1/4 right-1/4 bg-blue-300"> -->
		<!-- 	<Carousel.Previous /> -->
		<!-- 	<Carousel.Next /> -->
		<!-- </div> -->
		<div
			class="flex aspect-square h-full w-full px-10 basis-2/3 items-center justify-center rounded-full "
		>
      {#key current}
			<ImageWrapper
				imageClass="rounded-full w-full object-cover  h-full aspect-square"
				sizes="100vw"
				meta={[mainImg]}
				alt="landing hero image"
			/>
      {/key}
		</div>
	</Carousel.Root>
</div>
