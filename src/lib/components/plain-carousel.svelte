<script lang="ts">
	import * as Carousel from '$lib/components/ui/carousel';
	import { CldImage } from 'svelte-cloudinary';
	import { ImageWrapper } from '$lib/components/image-wrapper';

	import firetesting1 from '$lib/assets/images/testing-1.jpeg?w=500;800;1000;1200&format=avif;webp;jpg&as=picture';
	import firetesting2 from '$lib/assets/images/testing-2.jpeg?w=500;800;1000;1200&format=avif;webp;jpg&as=picture';
	import firetesting3 from '$lib/assets/images/testing-3.jpeg?w=500;800;1000;1200&format=avif;webp;jpg&as=picture';

</script>

<Carousel.Root class="">
	<Carousel.Content class="items-center justify-around bg-background/10 py-10">
		<Carousel.Item class="basis-1/4 text-center">
      <ImageWrapper imageClass="" meta={firetesting1} />
		</Carousel.Item>
		<Carousel.Item class="basis-1/3 text-center">
      <ImageWrapper imageClass="" meta={firetesting2} />
		</Carousel.Item>
		<Carousel.Item class="basis-1/4 bg-red-300 text-center">
      <ImageWrapper imageClass="" meta={firetesting3} />
		</Carousel.Item>
	</Carousel.Content>
	<Carousel.Previous arrowClass="w-6 h-6" class="-left-8 h-full rounded-none border-none " />
	<Carousel.Next arrowClass="w-6 h-6" class="-right-8 h-full rounded-none border-none " />
</Carousel.Root>
