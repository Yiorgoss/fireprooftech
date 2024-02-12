<script lang="ts">
  import { type CarouselAPI } from "$lib/components/ui/carousel/context.js";
	import * as Carousel from '$lib/components/ui/carousel';
	export let images: String[] = [];
let api: CarouselAPI;
  let count = 0;
  let current = 0;
  $: if (api) {
    count = api.scrollSnapList().length;
    current = api.selectedScrollSnap() + 1;
    api.on("select", () => {
      current = api.selectedScrollSnap() + 1;
      console.log(current)
    });
  }

</script>

<div class="mx-20">
<Carousel.Root opts={{ loop: true }} bind:api class="mx-auto w-full " orientation="horizontal">
	<Carousel.Content class=" bg-blue-400">
			{#each images as image}
				<Carousel.Item >
					{image}
				</Carousel.Item>
			{/each}
	</Carousel.Content>
	<Carousel.Next />
	<Carousel.Previous />
</Carousel.Root>
    </div>
