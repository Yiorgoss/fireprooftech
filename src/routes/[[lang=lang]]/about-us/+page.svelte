<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as m from '$pg/messages';
	import PlainCarousel from '$lib/components/plain-carousel.svelte';
	import { ImageWrapper } from '$lib/components/image-wrapper';

	//@ts-ignore
	import carousel1 from '$lib/assets/images/past-work-1.jpeg?w=100;200;300;500;800&format=avif;webp;jpg&as=picture';
	//@ts-ignore
	import pastWork1 from '$lib/assets/images/past-work-1.jpeg?w=800;1200;1600;&format=avif;webp;jpg&as=picture';
	//@ts-ignore
	import pastWork2 from '$lib/assets/images/past-work-2.jpeg?w=800;1200;1600;&format=avif;webp;jpg&as=picture';
	//@ts-ignore
	import pastWork3 from '$lib/assets/images/past-work-3.jpeg?w=800;1200;1600;&format=avif;webp;jpg&as=picture';
	//@ts-ignore
	import pastWork4 from '$lib/assets/images/past-work-4.jpeg?w=800;1200;1600;&format=avif;webp;jpg&as=picture';
	//@ts-ignore
	import landing_orange from '$lib/assets/images/landing_orange.jpg?w=500;1000;&format=avif;webp;jpg&as=picture';
	//@ts-ignore
	import blue_bg from '$lib/assets/images/products_text_background.jpg?w=500;1000;&format=avif;webp;jpg&as=picture';
	import CircleImageSection from '$lib/components/circle-image-section.svelte';
</script>

<svelte:head>
	<title>{m.about_page_head_title()}</title>
	<meta name="description" content={m.about_page_head_description()} />
</svelte:head>

<div class="relative -mt-[100px] text-background w-full overflow-hidden bg-transparent">
	<div class="fixed bottom-0 left-0 right-0 top-0 -z-10">
		<ImageWrapper ignoreFallback={true} meta={[blue_bg]} imageClass="w-full h-full object-cover" />
	</div>
	<div class="relative  h-[500px] overflow-hidden object-cover">
		<ImageWrapper imageClass="h-full object-cover" meta={[landing_orange]} />
		<div class="bg-gradient-about-us absolute inset-0"></div>
	</div>
	<h1 class=" w-full bg-foreground text-background py-16 text-center font-playfair text-6xl uppercase">
		{m.about_fpt()}
	</h1>
		<div class="px-0 py-10 md:px-10">
			<div class="bg-foreground flex flex-col py-10">
				<div class="mx-auto w-full px-2 md:w-1/2">{m.about_page_description_one()}</div>
				<div class="mx-auto w-full px-2 md:w-1/2">{m.about_page_description_two()}</div>
				<div class="mx-auto w-full px-2 md:w-1/2">{m.about_page_description_three()}</div>
			</div>
		</div>
		<div
			class="my-6 flex flex-col bg-foreground items-center justify-center  pb-10 pt-0 text-background"
		>
			<div class="w-full px-2 pb-10 bg-foreground text-lg md:w-2/3">
				<h2 class="w-full py-10 font-playfair text-6xl uppercase">
					{m.about_page_our_founder_heading()}
				</h2>
				<p class="tracking-wider">{m.about_page_our_founder_description_paragraph_one()}</p>
				<p class="pt-5 tracking-wider">{m.about_page_our_founder_description_paragraph_two()}</p>
				<p class="pt-5 tracking-wider">{m.about_page_our_founder_description_paragraph_three()}</p>
				<p class="pt-5 tracking-wider">{m.about_page_our_founder_description_paragraph_four()}</p>
			</div>
		</div>
		<div class="mt-6 flex flex-col bg-foreground my-5 container w-4/5 items-center justify-center gap-6 p-10">
			<h3
				class="max-w-[400px] text-center font-playfair text-2xl uppercase text-background md:text-4xl md:leading-[3rem]"
			>
				{m.about_page_project_in_mind()}
			</h3>
			<div class="w-20 border-t-4 border-white pb-4"></div>
			<Button size="lg" variant="destructive" class="uppercase">{m.get_free_estimate()}</Button>
		</div>
		<h2 class="bg-foreground py-20 text-center font-playfair text-4xl uppercase md:text-6xl">
			{m.about_page_fireproof_testing_heading()}
		</h2>
		<div class="mx-auto bg-foreground w-4/6 px-10 py-5 my-5">
			<PlainCarousel />
		</div>
	</div>
	<div class="overflow-hidden px-0 py-10 md:px-14">
		<div
			class="aspect-normal mx-auto my-10 flex max-w-[1000px] items-center justify-center rounded-none bg-foreground py-0 text-background md:-my-[10%] md:aspect-square md:rounded-full"
		>
			<div
				class="flex h-full w-full flex-col justify-center py-10 md:aspect-square md:h-[70.7%] md:w-[70.7%] md:py-10"
			>
				<h2 class="pb-10 text-center font-playfair text-4xl uppercase md:text-7xl">
					{m.about_page_our_work_heading()}
				</h2>
				<div class="grid md:grid-cols-2 grid-cols-1 gap-10 px-10 md:px-0">
					<div class="border-4 border-destructive ">
						<ImageWrapper clickableImage={true} imageClass="border-4 border-background object-cover h-full" meta={pastWork1} />
					</div>
					<div class="border-4 border-destructive ">
						<ImageWrapper clickableImage={true} imageClass="border-4 object-cover h-full border-background" meta={pastWork2} />
					</div>
					<div class="border-4 border-destructive ">
						<ImageWrapper clickableImage={true} imageClass="border-4 border-background object-cover h-full" meta={pastWork3} />
					</div>
					<div class="border-4 border-destructive ">
						<ImageWrapper clickableImage={true} imageClass="border-4 border-background object-cover h-full" meta={pastWork4} />
					</div>
				</div>
			</div>
		</div>
</div>
