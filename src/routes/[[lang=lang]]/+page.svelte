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
	import spec from '$lib/assets/images/spec.png?w=100;200;300;500;800&format=avif;webp;jpg&as=picture';
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
	import { onMount } from 'svelte';

	import CircularCarousel from '$lib/components/circular-carousel.svelte';
	import CircleImageSection from '$lib/components/circle-image-section.svelte';
	import WhyPickUsCarousel from '$lib/components/why-pick-us-carousel.svelte';
	import { Button } from '$lib/components/ui/button';
	import { ImageWrapper } from '$lib/components/image-wrapper/';
	import { i18n } from '$lib/i18n';

	import { qualitiesList, specList } from '$lib/assets/data';

	const images = [carousel1, carousel2, carousel3];
	let scroll = 0;
	let mounted = false;
	let imageSection: HTMLElement;
	let observer: IntersectionObserver;

	$: if (imageSection && observer) {
		Array.from(imageSection.children).forEach((child) => observer.observe(child));
		// observer.observe(imageSection);
	}
	onMount(() => {
		mounted = true;
		observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					entry.target.classList.toggle('observer', !entry.isIntersecting);
				});
			},
			{ threshold: 0.5, rootMargin: '-30px' }
		);
		return () => observer.disconnect();
	});
</script>

<svelte:head>
	<title>{m.home_page_head_title()}</title>
	<meta name="description" content={m.home_page_head_description()} />
</svelte:head>

<svelte:window bind:scrollY={scroll} />

<div class="">
	<!-- <div class="overflow-x-hidden"> -->
	<div class="relative -mt-[100px] h-svh overflow-hidden">
		<ImageWrapper imageClass="h-svh w-full object-cover" meta={landing} alt="landing hero image" />
		<div class="absolute inset-0 grid bg-[#9fb0b9] opacity-50 md:grid-cols-6">
			{#each [1, 2, 3, 4, 5, 6] as _}
				<div class=" h-full border-l border-background/50"></div>
			{/each}
		</div>

		<div
			class="container absolute inset-0 flex w-full items-center px-2 py-20 md:items-end md:px-20"
		>
			<div
				class="absolute bottom-0 pb-20 sm:pb-20 md:left-20 ltr:md:right-1/3 rtl:md:left-1/2 rtl:md:right-20"
			>
				<h1
					class:opacity-0={!mounted}
					class="w-3/4 py-14 font-playfair text-4xl transition-opacity delay-200 duration-1000 ease-in sm:text-5xl md:text-8xl"
				>
					{m.home_page_landing_heading()}
				</h1>
				<p
					class:opacity-0={!mounted}
					class="w-3/4 px-5 leading-7 transition-opacity delay-300 duration-1000 ease-in sm:text-xl md:text-2xl"
				>
					{m.home_page_landing_subheading()}
				</p>
			</div>
		</div>
	</div>
	<div class="bg-gradient-to-b from-slate-300 to-slate-50/50">
		<div class="container flex flex-col px-2 pl-0 pt-10 md:flex-row md:pl-12">
			<div class="basis-1/2">
				<CircularCarousel {images} />
			</div>
			<div class="flex basis-1/2 flex-col items-start justify-end px-4 py-10">
				<h2 class="py-5 text-start font-playfair text-3xl uppercase md:text-4xl">
					{m.home_page_carousel_heading()}
				</h2>
				<p class="">{m.home_page_carousel_description()}</p>
				<a class="pt-10" href={i18n.route('/contact-us')}>
					<Button variant="destructive" size="xl">{m.get_in_touch()}</Button>
				</a>
			</div>
		</div>
	</div>
	<section class="container pt-20 pb-10 border-b">
		<div class="grid grid-cols-1 gap-10 md:grid-cols-2">
			<div class="px-10 flex flex-col">
        <div class="py-10">
				<ImageWrapper
					imageClass="flex-grow min-h-[300px] w-full object-cover"
					meta={spec}
					alt="quality infographic"
				/>
          </div>
				<ul class="grid grid-cols-2 gap-x-10 pt-10">
					{#each specList as spec}
						<li class="leading-5 list-disc max-w-[200px] text-base">{spec.text}</li>
					{/each}
				</ul>
			</div>
			<div class="flex flex-col items-center justify-start px-10">
				<h2 class="py-10 font-playfair text-4xl uppercase">{m.home_page_qualities_heading()}</h2>
				<ul class="">
					{#each qualitiesList as quality}
						<li class="list-disc">{quality.text}</li>
					{/each}
				</ul>
			</div>
		</div>
	</section>
	<section class="mx-auto flex flex-col overflow-hidden">
		<div class="mx-auto basis-full px-4 pt-0 md:w-2/3 md:pt-20">
			<h2 class="w-5/6 py-10 font-playfair text-3xl uppercase md:text-7xl">
				{m.home_page_process_heading()}
			</h2>
			<h3 class="float-right py-5 text-3xl underline underline-offset-8">
				{m.home_page_process_subheading()}
			</h3>
		</div>
		<div class="flex flex-col" bind:this={imageSection}>
			<div class="observer mx-0 pt-10 opacity-100 transition-all duration-1000 ease-out">
				<CircleImageSection
					image={step1}
					title={m.home_page_process_one_title()}
					description={m.home_page_process_one_description()}
				/>
			</div>
			<div class="observer mx-0 pt-10 opacity-100 transition-all duration-1000 ease-out">
				<CircleImageSection
					image={step2}
					title={m.home_page_process_two_title()}
					description={m.home_page_process_two_description()}
					isInset={true}
				/>
			</div>
			<div class="observer mx-0 pt-10 opacity-100 transition-all duration-1000 ease-out">
				<CircleImageSection
					image={step3}
					title={m.home_page_process_three_title()}
					description={m.home_page_process_three_description()}
				/>
			</div>
			<div class="observer mx-0 pt-10 opacity-100 transition-all duration-1000 ease-out">
				<CircleImageSection
					image={step4}
					title={m.home_page_process_four_title()}
					description={m.home_page_process_four_description()}
					isInset={true}
				/>
			</div>
			<div class="observer mx-0 pt-10 opacity-100 transition-all duration-1000 ease-out">
				<CircleImageSection
					image={step5}
					title={m.home_page_process_five_title()}
					description={m.home_page_process_five_description()}
				/>
			</div>
		</div>
		<div class="flex items-center justify-center pb-10 pt-20">
			<a href={i18n.route('/about-us')}>
				<Button size="xl" variant="destructive">{m.read_about_us()}</Button>
			</a>
		</div>
	</section>
	<div class="flex flex-col justify-center overflow-hidden border-t py-10">
		<h3 class="z-20 py-10 text-center font-playfair text-6xl uppercase">
			{m.home_page_why_pick_us_title()}
		</h3>
		<div class="container flex justify-center  pb-10">
				<WhyPickUsCarousel />
		</div>
	</div>
</div>
<div class="observer hidden">
	<!-- otherwise svelte removes unused styles ??  -->
</div>

<style>
	.observer {
		margin: 0 40px;
		opacity: 0;
	}
</style>
