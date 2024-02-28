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
		<Carousel.Content class="mt-0 basis-1/3 gap-5 py-10 md:gap-5">
			{#each images as image, i}
				<Carousel.Item
					class={`${current == i ? 'scale-110 grayscale-0' : 'grayscale'} px-5 transition-transform duration-200  hover:scale-125 hover:grayscale-0`}
				>
					<button
						class:text-foreground-muted={current != i}
						class="flex h-full w-full items-center justify-center"
						on:click={() => (current = i)}
					>
						<div class="aspect-square rounded-full text-4xl font-semibold">
							<ImageWrapper
								imageClass="rounded-full w-[60px] md:w-[100px] border-4 h-[60px] md:h-[100px] h-full object-stretch aspect-square"
								sizes="10"
								meta={[image]}
								alt="landing hero image"
							/>
						</div>
					</button>
				</Carousel.Item>
			{/each}
		</Carousel.Content>
		{#key current}
			<div
				class="my-auto flex aspect-square h-full w-full max-h-[400px] basis-2/3 flex-col items-center justify-center rounded-full ltr:pl-0 rtl:pr-0 ltr:md:pl-10 rtl:md:md:pr-10"
			>
				<ImageWrapper
					imageClass="rounded-full border-8 object-cover w-full aspect-square"
					sizes="(min-width: 1000) 70vw, 40vw"
					meta={[mainImg]}
					alt="landing hero image"
				/>
			</div>
		{/key}
	</Carousel.Root>
</div>
