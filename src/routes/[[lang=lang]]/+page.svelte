<script lang="ts">
	//@ts-ignore
	import landing from '$lib/assets/images/landing.jpg?w=500;1000;1500;2000;2500;3000&format=avif;webp;jpg&as=picture';
	//@ts-ignore
	import carousel1 from '$lib/assets/images/carousel-1.jpeg?w=100;200;300;500;800&format=avif;webp;jpg&as=picture';
	//@ts-ignore
	import spec from '$lib/assets/images/spec.png?w=100;200;300;500;800&format=avif;webp;jpg&as=picture';
	//@ts-ignore
	import step1 from '$lib/assets/images/step-1.jpeg?w=100;300;500;800&format=avif;webp;jpg&as=picture';
	//@ts-ignore
	import step2 from '$lib/assets/images/step-2.jpeg?w=100;300;500;800&format=avif;webp;jpg&as=picture';
	//@ts-ignore
	import step3 from '$lib/assets/images/step-3.jpeg?w=100;300;500;800&format=avif;webp;jpg&as=picture';
	//@ts-ignore
	import eco_friendly from '$lib/assets/images/eco_friendly.png?w=100&format=avif;webp;jpg&as=picture';

	import * as m from '$pg/messages';
	import { onMount } from 'svelte';

	import CircularCarousel from '$lib/components/circular-carousel.svelte';
	import CircleImageSection from '$lib/components/circle-image-section.svelte';
	import WhyPickUsCarousel from '$lib/components/why-pick-us-carousel.svelte';
	import { Button } from '$lib/components/ui/button';
	import { ImageWrapper } from '$lib/components/image-wrapper/';
	import { i18n } from '$lib/i18n';

	const images = [carousel1];
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
	export const qualitiesList = [
		{ text: m.quality_list_1() },
		{ text: m.quality_list_2() },
		{ text: m.quality_list_3() },
		{ text: m.quality_list_4() },
		{ text: m.quality_list_5() },
		{ text: m.quality_list_6() }
	];

	export const specList = [
		{ text: m.spec_list_1() },
		{ text: m.spec_list_2() },
		{ text: m.spec_list_3(), number: m.spec_list_3_5() },
		{ text: m.spec_list_4() }
	];
</script>

<svelte:head>
	<title>{m.home_page_head_title()}</title>
	<meta name="description" content={m.home_page_head_description()} />
</svelte:head>

<svelte:window bind:scrollY={scroll} />

<div class="">
	<!-- <div class="overflow-x-hidden"> -->
	<div class="relative -mt-[100px] h-[400px] overflow-hidden">
		<ImageWrapper imageClass="w-full h-full object-cover" meta={landing} alt="landing hero image" />
		<div class="absolute inset-0 grid bg-[#9fb0b9] opacity-80 md:grid-cols-6">
			{#each [1, 2, 3, 4, 5, 6] as _}
				<div class=" h-full border-l border-background/50"></div>
			{/each}
		</div>

		<div
			class="container absolute inset-0 flex w-full items-center px-2 py-0 md:items-end md:px-20 md:py-20"
		>
			<div class="absolute bottom-0 pb-20 sm:pb-20 md:left-20 md:right-20">
				<h1
					class:opacity-0={!mounted}
					class="w-3/4 py-0 font-playfair text-3xl transition-opacity delay-200 duration-1000 ease-in sm:text-5xl md:py-10 md:text-7xl"
				>
					{m.home_page_landing_heading()}
				</h1>
			</div>
		</div>
	</div>
	<div class="bg-gradient-to-b from-slate-300 to-slate-50/50">
		<div
			class="container flex flex-col items-center justify-center gap-0 pl-2 pr-2 pt-10 md:flex-row md:gap-10 md:pl-12"
		>
			<div class="flex basis-1/2 flex-col items-center justify-center px-4 py-10">
				<!-- <h2 class="py-5 text-start font-playfair text-3xl uppercase md:text-4xl"> -->
				<!-- 	{m.home_page_carousel_heading()} -->
				<!-- </h2> -->
				<p class="relative">
					{m.home_page_carousel_description()}
					<ImageWrapper
						imageClass="absolute h-10 w-10 -top-100 right-0"
						meta={eco_friendly}
						alt="eco friendly sticker"
					/>
				</p>

				<a class="pt-10" href={i18n.route('/contact-us')}>
					<Button variant="destructive" size="xl">{m.get_in_touch()}</Button>
				</a>
			</div>
		</div>
	</div>
	<section class="container border-b pb-10 pt-20">
		<div class="grid grid-cols-1 gap-10 md:grid-cols-2">
			<div class="flex flex-col px-10">
				<div class="py-10">
					<ImageWrapper
						imageClass="flex-grow min-h-[300px] w-full object-cover"
						meta={spec}
						alt="quality infographic"
					/>
				</div>
				<ul class=" grid grid-cols-2 gap-1 bg-border">
					{#each specList as spec}
						<li class="bg-background p-4 text-base leading-5">
							{spec.text}
							{#if spec.number}
								<span class="block">
									{spec.number}
								</span>
							{/if}
						</li>
					{/each}
					<li class="col-span-full bg-background text-center">
						<a class="text-base underline underline-offset-2 hover:no-underline" href="/pdf">
							{m.home_page_experiment_results()}
						</a>
					</li>
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
	<div class="flex flex-col justify-center overflow-hidden border-t py-10">
		<h3 class="z-20 py-10 text-center font-playfair text-6xl uppercase">
			{m.home_page_why_pick_us_title()}
		</h3>
		<div class="container flex justify-center pb-10">
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
