<script lang="ts">
	import * as m from '$pg/messages';
	import { CldImage } from 'svelte-cloudinary';
	import CircularCarousel from '$lib/components/circular-carousel.svelte';
	import CircleImageSection from '$lib/components/circle-image-section.svelte';
	import WhyPickUsCarousel from '$lib/components/why-pick-us-carousel.svelte';
	import { Button } from '$lib/components/ui/button';
	// export let data;

	const images = ['1', '2', '3', '4'];
</script>

<div class="">
	<!-- <div class="overflow-x-hidden"> -->
	<div class="relative h-dvh">
		<CldImage
			class="h-screen w-full bg-blue-300 object-fill"
			src="cld-sample-5"
			height={800}
			width={2000}
			alt="test"
		/>

		<div class="absolute inset-10 flex flex-wrap items-center px-20 py-20 md:items-end">
			<div class="">
				<h1 class="text-center">{m.home_page_landing_heading()}</h1>
				<p class="">{m.home_page_landing_subheading()}</p>
			</div>
		</div>
	</div>
	<div class="flex flex-col-reverse bg-blue-200 py-10 md:flex-row">
		<div class="basis-1/2">
			<CircularCarousel {images} />
		</div>
		<div class="basis-1/2 px-4 py-10">
			<h2 class="text-center py-5 text-2xl md:text-4xl">{m.home_page_carousel_heading()}</h2>
			<p class="">{m.home_page_carousel_description()}</p>
		</div>
	</div>
	<section class="overflow-hidden">
		<h2 class="text-2xl text-center md:text-4xl">{m.home_page_process_heading()}</h2>
		<h3 class="text-lg">{m.home_page_process_subheading()}</h3>
		<div class="flex flex-col gap-10">
			<CircleImageSection
				image="cld-sample-5"
				title={m.home_page_process_one_title()}
				description={m.home_page_process_one_description()}
			/>
			<div class="">
				<CircleImageSection
					image="cld-sample-5"
					title={m.home_page_process_two_title()}
					description={m.home_page_process_two_description()}
					isInset={true}
				/>
			</div>
			<CircleImageSection
				image="cld-sample-5"
				title={m.home_page_process_three_title()}
				description={m.home_page_process_three_description()}
			/>
		</div>
		<div class="flex items-center justify-center pt-20">
			<Button variant="destructive">{m.read_about_us()}</Button>
		</div>
	</section>
	<div class="flex flex-col justify-center ">
		<h3 class="py-10 text-center">{m.home_page_why_pick_us_title()}</h3>
		<div class="mx-auto ">
			<WhyPickUsCarousel />
		</div>
	</div>
</div>
