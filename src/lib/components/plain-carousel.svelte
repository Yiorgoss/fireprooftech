<script lang="ts">
	import * as Carousel from '$lib/components/ui/carousel';
	import { CldImage } from 'svelte-cloudinary';
	import { ImageWrapper } from '$lib/components/image-wrapper';

	//@ts-ignore
	import pastWork1 from '$lib/assets/images/work__1.jpeg?w=800;1200;1600;&format=avif;webp;jpg&as=picture';
	//@ts-ignore
	import pastWork2 from '$lib/assets/images/work__2.jpeg?w=800;1200;1600;&format=avif;webp;jpg&as=picture';
	// //@ts-ignore
	import pastWork3 from '$lib/assets/images/past-work-3.jpeg?w=800;1200;1600;&format=avif;webp;jpg&as=picture';
	// //@ts-ignore
	import pastWork4 from '$lib/assets/images/past-work-4.jpeg?w=800;1200;1600;&format=avif;webp;jpg&as=picture';
	// //@ts-ignore
	import pastWork6 from '$lib/assets/images/work__3.jpeg?w=800;1200;1600;&format=avif;webp;jpg&as=picture';
	// //@ts-ignore
	import pastWork5 from '$lib/assets/images/work__4.jpeg?w=800;1200;1600;&format=avif;webp;jpg&as=picture';
	// //@ts-ignore
	import pastWork7 from '$lib/assets/images/work__5.jpeg?w=800;1200;1600;&format=avif;webp;jpg&as=picture';
	// //@ts-ignore
	import pastWork8 from '$lib/assets/images/work__6.jpeg?w=800;1200;1600;&format=avif;webp;jpg&as=picture';
	// //@ts-ignore
	import pastWork9 from '$lib/assets/images/work__7.jpeg?w=800;1200;1600;&format=avif;webp;jpg&as=picture';
	// //@ts-ignore
	import pastWork10 from '$lib/assets/images/work__8.jpeg?w=800;1200;1600;&format=avif;webp;jpg&as=picture';

	const pastWorkList = [
		pastWork1,
		pastWork2,
		pastWork5,
		pastWork3,
		pastWork4,
		pastWork6,
		pastWork7,
		pastWork9,
		pastWork10,
		pastWork8,
	];
</script>

<Carousel.Root
	opts={{
		align: 'start',
		loop: true
	}}
>
	<Carousel.Content class="py-5">
		{#each pastWorkList as work}
			<Carousel.Item class="basis-1/2 md:basis-1/3">
				<div class="px-2">
					<ImageWrapper imageClass="" meta={[work]} />
				</div>
			</Carousel.Item>
		{/each}
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
