<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as m from '$pg/messages';
	import { CldImage } from 'svelte-cloudinary';
	import PlainCarousel from '$lib/components/plain-carousel.svelte';
	import { ImageWrapper } from '$lib/components/image-wrapper';

	import carousel1 from '$lib/assets/images/past-work-1.jpeg?w=100;200;300;500;800&format=avif;webp;jpg&as=picture';
	import pastWork1 from '$lib/assets/images/past-work-1.jpeg?w=800;1200;1600;&format=avif;webp;jpg&as=picture';
	import pastWork2 from '$lib/assets/images/past-work-2.jpeg?w=800;1200;1600;&format=avif;webp;jpg&as=picture';
	import pastWork3 from '$lib/assets/images/past-work-3.jpeg?w=800;1200;1600;&format=avif;webp;jpg&as=picture';
</script>

<svelte:head>
	<title>{m.about_page_head_title()}</title>
	<meta name="description" content={m.about_page_head_description()}/>
</svelte:head>

<div class="relative w-full overflow-hidden bg-foreground -mt-[100px] pt[100px]">
	<h1 class="w-full bg-off-blue py-16 text-center mt-[100px] font-playfair text-6xl uppercase">
		{m.about_fpt()}
	</h1>
	<div class="flex items-center justify-center">
		<ImageWrapper
			imageClass="-mt-[8px] rounded-full border-off-blue border-8 h-[300px] w-[300px]"
			meta={[carousel1]}
		/>
	</div>
	<div class="px-0 py-10 md:px-10">
		<div class="-mt-16 bg-off-blue py-10">
			<div class="mx-auto w-full px-2 md:w-1/2">{m.about_page_description_one()}</div>
		</div>
	</div>
	<div class="container flex flex-col items-center justify-center py-10 text-background">
		<h2 class="py-10 font-playfair text-6xl">{m.about_page_our_founder_heading()}</h2>
		<div class="w-full px-2 pb-10 text-lg leading-6 md:w-2/3">
			<p class="">{m.about_page_our_founder_description_paragraph_one()}</p>
			<p class="pt-3">{m.about_page_our_founder_description_paragraph_two()}</p>
			<p class="pt-3">{m.about_page_our_founder_description_paragraph_three()}</p>
			<p class="pt-3">{m.about_page_our_founder_description_paragraph_four()}</p>
		</div>
	</div>
	<div class="overflow-hidden px-14 bg-off-blue">
		<div
			class="mx-auto -mb-[15%] -mt-[15%] flex aspect-square w-fit min-w-[90%] items-center justify-center rounded-full bg-foreground text-background"
		>
			<div class="flex aspect-square h-[70.7%] w-[70.7%] flex-col justify-around">
				<h2 class="text-center font-playfair text-4xl md:text-5xl">
					{m.about_page_our_work_heading()}
				</h2>
				<div class="">
					{m.about_page_our_work_description()}
				</div>
				<div class="flex items-center justify-center gap-5">
					<div class="basis-1/4">
						<ImageWrapper meta={pastWork1} />
					</div>
					<div class="basis-1/2">
						<ImageWrapper meta={pastWork2} />
					</div>
					<div class="basis-1/4">
						<ImageWrapper meta={pastWork3} />
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="flex flex-col items-center justify-center gap-10 border-y-4 p-10">
		<h3 class="font-playfair text-2xl text-background md:text-4xl">
			{m.about_page_project_in_mind()}
		</h3>
		<div class="h-1 border-t-4 border-white"></div>
		<Button>{m.get_free_estimate()}</Button>
	</div>
	<div class="pt-5">
		<h2 class="bg-off-blue py-20 text-center font-playfair text-4xl md:text-5xl">
			{m.about_page_our_process_title()}
		</h2>
		<div class="container flex min-h-[500px] w-full flex-col py-10 md:flex-row">
			<div class="flex basis-1/2 items-center justify-center">
				<CldImage src="cld-sample-5" height={300} width={300} alt="test" />
			</div>
			<p class="basis-1/2 text-background">{m.about_page_our_process_description()}</p>
		</div>
	</div>
	<h2 class="bg-off-blue py-20 text-center font-playfair text-4xl md:text-5xl">
		{m.about_page_fireproof_testing_heading()}
	</h2>
	<h3 class="py-10 text-center font-playfair text-2xl text-background md:text-4xl">
		{m.about_page_fireproof_testing_subheading()}
	</h3>
	<div class="mx-auto w-fit max-w-[500px] border-8 p-10">
		<p class="py-10 text-background">{m.about_page_fireproof_testing_description()}</p>
	</div>
	<div class="mx-auto w-4/6 py-5">
		<PlainCarousel />
	</div>
	<div class="overflow-hidden bg-off-blue px-10 py-10">
		<h2 class="py-10 font-playfair text-4xl md:text-5xl">
			{m.about_page_variations_of_resistance_heading()}
		</h2>
		<div class="flex flex-col items-center justify-center gap-5 break-all md:flex-row">
			<div
				class="flex w-full flex-col items-center justify-center gap-3 border-8 border-destructive bg-foreground p-5 text-background md:w-1/4"
			>
				<CldImage class="rounded-full" src="cld-sample-5" height={200} width={200} alt="test" />
				<h3 class="font-playfair">{m.about_page_variations_of_resistance_card_one_heading()}</h3>
				<p class="">{m.about_page_variations_of_resistance_card_one_description()}</p>
			</div>
		</div>
	</div>
</div>
