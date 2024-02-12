<script lang="ts">
	import * as Carousel from '$lib/components/ui/carousel';
	import { CldImage } from 'svelte-cloudinary';
</script>

<Carousel.Root class="ove[[rflow-x-hidden">
	<Carousel.Content class="items-center justify-around bg-background/10 py-10">
		<Carousel.Item class="basis-1/4 text-center">
			<CldImage src="cld-sample-5" height={300} width={300} alt="test" />
		</Carousel.Item>
		<Carousel.Item class="basis-1/3 text-center">
			<CldImage src="cld-sample-5" height={300} width={300} alt="test" />
		</Carousel.Item>
		<Carousel.Item class="basis-1/4 text-center">
			<CldImage src="cld-sample-5" height={300} width={300} alt="test" />
		</Carousel.Item>
	</Carousel.Content>
	<Carousel.Previous arrowClass="w-6 h-6" class="-left-8 h-full rounded-none border-none " />
	<Carousel.Next arrowClass="w-6 h-6" class="-right-8 h-full rounded-none border-none " />
</Carousel.Root>
