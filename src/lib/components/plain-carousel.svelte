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
	//@ts-ignore
	import firetesting4 from '$lib/assets/images/testing-4.jpeg?w=500;800;1000;1200&format=avif;webp;jpg&as=picture';
</script>

<Carousel.Root
	class="py-10"
	opts={{
		align: 'start',
		loop: true
	}}
>
	<Carousel.Content class="container max-h-[300px] items-center justify-around gap-10 px-2 py-10">
		<Carousel.Item class="basis-1/3">
			<ImageWrapper pictureClass="" imageClass="" meta={firetesting4} />
		</Carousel.Item>
		<Carousel.Item class="basis-1/3">
			<ImageWrapper pictureClass="flex h-full w-full" imageClass="object-contain h-auto" meta={firetesting1} />
		</Carousel.Item>
		<Carousel.Item class="basis-1/3">
			<ImageWrapper pictureClass="flex h-full w-full" imageClass="object-contain h-auto" meta={firetesting2} />
		</Carousel.Item>
		<Carousel.Item class="basis-1/3">
			<ImageWrapper pictureClass="flex h-full w-full" imageClass="object-contain h-auto" meta={firetesting3} />
		</Carousel.Item>
	</Carousel.Content>
	<Carousel.Previous
		arrowClass="rounded-full border border-background p-1 w-8 h-8"
		class="-left-8 h-full rounded-none border-none bg-transparent text-background hover:bg-transparent "
	/>
	<Carousel.Next
		arrowClass="rounded-full border border-background p-1 w-8 h-8"
		class="-right-8 h-full rounded-none border-none bg-transparent text-background hover:bg-transparent "
	/>
</Carousel.Root>
