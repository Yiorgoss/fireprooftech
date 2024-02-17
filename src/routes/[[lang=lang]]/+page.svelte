<script lang="ts">
	import * as m from '$pg/messages';
	import { CldImage } from 'svelte-cloudinary';
	import CircularCarousel from '$lib/components/circular-carousel.svelte';
	import CircleImageSection from '$lib/components/circle-image-section.svelte';
	import WhyPickUsCarousel from '$lib/components/why-pick-us-carousel.svelte';
	import { Button } from '$lib/components/ui/button';
	// export let data;

	const images = ['cld-sample-5', 'cld-sample-5', 'cld-sample-5', 'cld-sample-5'];
</script>

<div class="">
	<!-- <div class="overflow-x-hidden"> -->
	<div class="relative h-dvh">
		<CldImage
			class="mx-auto h-full w-full bg-blue-300 object-cover"
			src="cld-sample-5"
			alt="test"
      width="auto"
      height="auto"
			sizes="100vw"
		/>

		<div
			class="container absolute inset-0 flex w-full flex-wrap items-center px-2 py-20 md:items-end md:px-20"
		>
			<div class="">
				<h1 class="py-10 font-playfair text-6xl">{m.home_page_landing_heading()}</h1>
				<p class="xl:w-1/2">{m.home_page_landing_subheading()}</p>
			</div>
		</div>
	</div>
	<div class="bg-blue-200">
		<div class="container flex flex-col-reverse bg-blue-200 px-2 py-10 pl-0 md:flex-row md:pl-12">
			<div class="basis-1/2">
				<CircularCarousel {images} />
			</div>
			<div class="basis-1/2 px-4 py-10">
				<h2 class="break-all py-5 text-center font-playfair text-3xl md:text-4xl">
					{m.home_page_carousel_heading()}
				</h2>
				<p class="">{m.home_page_carousel_description()}</p>
			</div>
		</div>
	</div>
	<section class="overflow-hidden">
		<div class="mx-auto w-1/2 py-20">
			<h2 class="py-10 font-playfair text-2xl md:text-6xl">{m.home_page_process_heading()}</h2>
			<h3 class="float-right py-5 text-2xl underline underline-offset-8">
				{m.home_page_process_subheading()}
			</h3>
		</div>
		<div class="flex flex-col gap-10">
			<div class="pt-10">
				<CircleImageSection
					image="cld-sample-5"
					title={m.home_page_process_one_title()}
					description={m.home_page_process_one_description()}
				/>
			</div>
			<div class="pt-10">
				<CircleImageSection
					image="cld-sample-5"
					title={m.home_page_process_two_title()}
					description={m.home_page_process_two_description()}
					isInset={true}
				/>
			</div>
			<div class="pt-10">
				<CircleImageSection
					image="cld-sample-5"
					title={m.home_page_process_three_title()}
					description={m.home_page_process_three_description()}
				/>
			</div>
			<div class="pt-10">
				<CircleImageSection
					image="cld-sample-5"
					title={m.home_page_process_four_title()}
					description={m.home_page_process_four_description()}
					isInset={true}
				/>
			</div>
			<div class="pt-10">
				<CircleImageSection
					image="cld-sample-5"
					title={m.home_page_process_five_title()}
					description={m.home_page_process_five_description()}
				/>
			</div>
		</div>
		<div class="flex items-center justify-center pb-10 pt-20">
			<Button variant="destructive">{m.read_about_us()}</Button>
		</div>
	</section>
	<div class="flex flex-col justify-center border-t py-10">
		<h3 class="py-10 text-center font-playfair text-6xl">{m.home_page_why_pick_us_title()}</h3>
		<div class="container p-10">
			<div class="">
				<WhyPickUsCarousel />
			</div>
		</div>
	</div>
</div>
