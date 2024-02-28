<script lang="ts">
	import * as Carousel from '$lib/components/ui/carousel';
	import { CldImage } from 'svelte-cloudinary';
	import { ImageWrapper } from '$lib/components/image-wrapper';

  //@ts-ignore
	import firetesting1 from '$lib/assets/images/testing-1.jpeg?w=500;800;1000;1200&format=avif;webp;jpg&as=picture';
  //@ts-ignore
	import firetesting2 from '$lib/assets/images/testing-2.jpeg?w=500;800;1000;1200&format=avif;webp;jpg&as=picture';
  //@ts-ignore
	import firetesting3 from '$lib/assets/images/testing-3.jpeg?w=500;800;1000;1200&format=avif;webp;jpg&as=picture';

</script>

<Carousel.Root class="py-10">
	<Carousel.Content class="gap-10 max-h-[300px] items-center justify-around -background/10 py-10">
		<Carousel.Item class="basis-1/4 text-center">
      <ImageWrapper imageClass="" meta={firetesting1} />
		</Carousel.Item>
		<Carousel.Item class="basis-1/4 text-center">
      <ImageWrapper imageClass="" meta={firetesting2} />
		</Carousel.Item>
		<Carousel.Item class=" basis-1/4 text-center">
      <ImageWrapper imageClass="" meta={firetesting3} />
		</Carousel.Item>
	</Carousel.Content>
	<Carousel.Previous arrowClass="rounded-full border border-background p-1 w-8 h-8" class="bg-transparent text-background -left-8 h-full rounded-none border-none " />
	<Carousel.Next arrowClass="rounded-full border border-background p-1 w-8 h-8" class="bg-transparent text-background -right-8 h-full rounded-none border-none " />
</Carousel.Root>
