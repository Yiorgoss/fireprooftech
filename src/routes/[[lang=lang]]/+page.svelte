<script lang="ts">
	//@ts-ignore
	import landing from '$lib/assets/images/landing.jpg?w=500;1000;1500;2000;2500;3000&format=avif;webp;jpg&as=picture';
	//@ts-ignore
	import carousel1 from '$lib/assets/images/carousel-1.jpeg?w=100;200;300;500;800&format=avif;webp;jpg&as=picture';
	//@ts-ignore
	import carousel2 from '$lib/assets/images/carousel-2.jpeg?w=100;200;300;500;800&format=avif;webp;jpg&as=picture';
	//@ts-ignore
	import carousel3 from '$lib/assets/images/carousel-3.jpeg?w=100;200;300;500;800&format=avif;webp;jpg&as=picture';
	//@ts-ignore
	import step1 from '$lib/assets/images/step-1.jpeg?w=100;300;500;800&format=avif;webp;jpg&as=picture';
	//@ts-ignore
	import step2 from '$lib/assets/images/step-2.jpeg?w=100;300;500;800&format=avif;webp;jpg&as=picture';
	//@ts-ignore
	import step3 from '$lib/assets/images/step-3.jpeg?w=100;300;500;800&format=avif;webp;jpg&as=picture';
	//@ts-ignore
	import step4 from '$lib/assets/images/step-4.jpeg?w=100;300;500;800&format=avif;webp;jpg&as=picture';
	//@ts-ignore
	import step5 from '$lib/assets/images/step-5.jpeg?w=100;300;500;800&format=avif;webp;jpg&as=picture';

	import * as m from '$pg/messages';
	import { fade } from 'svelte/transition';
	import { onDestroy, onMount } from 'svelte';

	import CircularCarousel from '$lib/components/circular-carousel.svelte';
	import CircleImageSection from '$lib/components/circle-image-section.svelte';
	import WhyPickUsCarousel from '$lib/components/why-pick-us-carousel.svelte';
	import { Button } from '$lib/components/ui/button';
	import { ImageWrapper } from '$lib/components/image-wrapper/';

	const images = [carousel1, carousel2, carousel3];
	let scroll = 0;
	let mounted = false;
	let imageSection: HTMLElement;
	let observer: IntersectionObserver;

	$: if (imageSection) {
		Array.from(imageSection.children).forEach((child) => observer.observe(child));
	}
	onMount(() => {
		mounted = true;
		observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
						entry.target.classList.toggle('bg-black', entry.isIntersecting);
				});
			},
			{ threshold: 0, rootMargin: '-200px' }
		);
		return () => observer.disconnect();
	});
</script>

<svelte:window bind:scrollY={scroll} />
<div class="">
	<!-- <div class="overflow-x-hidden"> -->
	<div class="relative -mt-[100px] h-lvh overflow-hidden">
		<!-- <ImageWrapper class="" src="$assets/images/landing.jpeg" alt="test" /> -->
		<ImageWrapper imageClass="h-lvh w-full object-cover" meta={landing} alt="landing hero image" />
		<div class="absolute inset-0 bg-[#9fb0b9] opacity-50"></div>

		<div
			class="container absolute inset-0 flex w-full items-center px-2 py-20 md:items-end md:px-20"
		>
			<div class="absolute bottom-20 md:left-20 md:right-1/2 rtl:md:left-1/2 rtl:md:right-20">
				<h1
					class:opacity-0={!mounted}
					class="py-10 font-playfair text-6xl transition-opacity delay-500 duration-1000 ease-in md:text-6xl lg:text-9xl"
				>
					{m.home_page_landing_heading()}
				</h1>
				<p
					class:opacity-0={!mounted}
					class="w-2/3 px-5 text-xl transition-opacity delay-700 duration-1000 ease-in md:text-2xl"
				>
					{m.home_page_landing_subheading()}
				</p>
			</div>
		</div>
	</div>
	<div class="bg-off-blue">
		<div class="container flex flex-col-reverse px-2 py-10 pl-0 md:flex-row md:pl-12">
			<div class="basis-1/2" style:transform={`translate(0,${scroll * 0.05}px)`}>
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
	<section class="mx-auto flex flex-col overflow-hidden">
		<div class="mx-auto basis-full px-4 pt-20 md:w-1/2">
			<h2 class="py-10 font-playfair text-3xl md:text-6xl">{m.home_page_process_heading()}</h2>
			<h3 class="float-right py-5 text-2xl underline underline-offset-8">
				{m.home_page_process_subheading()}
			</h3>
		</div>
		<div class="flex flex-col" bind:this={imageSection}>
			<div class="pt-10 transition ease-out duration-500" class:-translate-x-20={mounted}  class:opacity-0={mounted}>
				<CircleImageSection
					image={step1}
					title={m.home_page_process_one_title()}
					description={m.home_page_process_one_description()}
				/>
			</div>
			<div class="pt-10" class:opacity-={mounted}>
				<CircleImageSection
					image={step2}
					title={m.home_page_process_two_title()}
					description={m.home_page_process_two_description()}
					isInset={true}
				/>
			</div>
			<div class="pt-10" class:opacity-={mounted}>
				<CircleImageSection
					image={step3}
					title={m.home_page_process_three_title()}
					description={m.home_page_process_three_description()}
				/>
			</div>
			<div class="pt-10" class:opacity-={mounted}>
				<CircleImageSection
					image={step4}
					title={m.home_page_process_four_title()}
					description={m.home_page_process_four_description()}
					isInset={true}
				/>
			</div>
			<div class="pt-10" class:opacity-={mounted}>
				<CircleImageSection
					image={step5}
					title={m.home_page_process_five_title()}
					description={m.home_page_process_five_description()}
				/>
			</div>
		</div>
		<div class="flex items-center justify-center pb-10 pt-20">
			<Button size="xl" variant="destructive">{m.read_about_us()}</Button>
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
	<div class="hiden observer">
		<!-- otherwise svelte removes unused styles ??  -->
	</div>
</div>

<style>
	.observer {
    opacity:100;
    transform:translateX(0)
	}
</style>
