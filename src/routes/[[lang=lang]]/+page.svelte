<script lang="ts">
	//@ts-ignore
	import landing from '$lib/assets/images/landing_new.jpg?w=500;1000;1700;2500&format=avif;webp;jpg&as=picture';
	//@ts-ignore
	import glass_pod from '$lib/assets/images/glass_pod.jpg?w=400;600;800;1500&format=avif;webp;jpg&as=picture';
	//@ts-ignore
	import glass_door from '$lib/assets/images/glass_door_1.jpg?w=400;600;800;1500&format=avif;webp;jpg&as=picture';
	//@ts-ignore
	import glass_sheets from '$lib/assets/images/glass_sheets.jpg?w=400;600;800;1500&format=avif;webp;jpg&as=picture';
	//@ts-ignore
	import glass_windows from '$lib/assets/images/landing.jpg?w=400;600;800;1500&format=avif;webp;jpg&as=picture';

	import * as m from '$pg/messages';

	import WhyPickUsCarousel from '$lib/components/why-pick-us-carousel.svelte';
	import { ImageWrapper } from '$lib/components/image-wrapper/';
	import CardHomePage from '$lib/components/card-home-page.svelte';

	let scroll = 0;

	const tableData = [
		{ title: m.home_page_table_1_title(), field: m.home_page_table_1_field() },
		{ title: m.home_page_table_2_title(), field: m.home_page_table_2_field() },
		{ title: m.home_page_table_3_title(), field: m.home_page_table_3_field() },
		{ title: m.home_page_table_4_title(), field: m.home_page_table_4_field() },
		{ title: m.home_page_table_5_title(), field: m.home_page_table_5_field() },
		{ title: m.home_page_table_6_title(), field: m.home_page_table_6_field() },
		{ title: m.home_page_table_7_title(), field: m.home_page_table_7_field() },
		{ title: m.home_page_table_8_title(), field: m.home_page_table_8_field() },
		{ title: m.home_page_table_9_title(), field: m.home_page_table_9_field() },
		{ title: m.home_page_table_10_title(), field: m.home_page_table_10_field() },
		{ title: m.home_page_table_11_title(), field: m.home_page_table_11_field() },
		{ title: m.home_page_table_12_title(), field: m.home_page_table_12_field() },
		{ title: m.home_page_table_13_title(), field: m.home_page_table_13_field() }
	];

	const contentData = [
		{
			title: m.home_page_card_1_title(),
			image: glass_pod,
			content: [
				{
					content: m.home_page_card_1_text_1()
				},
				{ isLinebreak: true },
				{
					content: m.home_page_card_1_text_2()
				},
				{ isLinebreak: true },
				{
					content: m.home_page_card_1_text_3()
				}
			],
			button: {
				href: '/about-us',
				text: m.read_about_us()
			}
		},
		{
			title: m.home_page_card_2_title(),
			image: glass_door,
			content: [
				{
					content: m.home_page_card_2_text_1()
				},
				{ isLinebreak: true },
				{
					content: m.home_page_card_2_text_2(),
					isListItem: true
				},
				{
					content: m.home_page_card_2_text_3(),
					isListItem: true
				},
				{
					content: m.home_page_card_2_text_4(),
					isListItem: true
				},
				{
					content: m.home_page_card_2_text_5(),
					isListItem: true
				},
				{
					content: m.home_page_card_2_text_6(),
					isListItem: true
				},
				{
					content: m.home_page_card_2_text_7(),
					isListItem: true
				},
				{
					content: m.home_page_card_2_text_8(),
					isListItem: true
				}
			]
		},
		{
			title: m.home_page_card_3_title(),
			image: glass_sheets,
			content: [
				{
					content: m.home_page_card_3_text_1()
				},
				{ isLinebreak: true },
				{
					content: m.home_page_card_3_text_2(),
					isListItem: true
				},
				{ isLinebreak: true },
				{
					content: m.home_page_card_3_text_3(),
					isListItem: true
				}
			]
		},
		{
			title: m.home_page_card_4_title(),
			image: glass_windows,
			content: [
				{
					content: m.home_page_card_4_text_1()
				},
				{ isLinebreak: true },
				{
					content: m.home_page_card_4_text_2()
				}
			],
			button: {
				href: '/contact-us',
				text: m.contact_us()
			}
		}
	];
</script>

<svelte:head>
	<title>{m.home_page_head_title()}</title>
	<meta name="description" content={m.home_page_head_description()} />
</svelte:head>

<svelte:window bind:scrollY={scroll} />

<div class="">
	<!-- <div class="overflow-x-hidden"> -->
	<div class="relative -mt-[100px] h-svh overflow-hidden">
		<ImageWrapper imageClass="w-full h-full object-cover" meta={landing} alt="landing hero image" />
		<div class="absolute inset-0 grid bg-gradient-landing  md:grid-cols-6">
			{#each [1, 2, 3, 4, 5, 6] as _}
				<div class=" h-full border-l border-background/50"></div>
			{/each}
		</div>

		<div class="absolute inset-0 flex w-full items-center px-2 py-0 md:items-end md:px-0 md:py-20">
			<div
				class="absolute bottom-0 w-full bg-gradient-to-b from-transparent to-blue-200/50 p-10 md:p-20"
			>
				<h1
					class="w-1/2 py-0 font-playfair text-3xl transition-opacity delay-200 duration-1000 ease-in md:py-10 md:text-5xl"
				>
					{m.home_page_landing_heading()}
				</h1>
				<div class="w-4/5 text-base md:text-xl">
					{m.home_page_landing_subheading()}
				</div>
			</div>
		</div>
	</div>
	<div class="container flex flex-col gap-y-14 py-20 md:gap-y-20">
		{#each contentData as cardData, i}
			<CardHomePage {cardData} floatLeft={i % 2 == 0} />
		{/each}
	</div>
	<div class="container flex flex-wrap justify-center border-gray-200 px-2 py-10">
		{#each tableData as item}
			<div class="w-1/2 py-0 text-base md:w-[7.6%] md:py-3 md:text-xs">
				<div class="h-20 border border-gray-300 bg-blue-900 px-2 text-white">{item.title}</div>
				<div class="h-14 border border-gray-300 px-2">{item.field}</div>
			</div>
		{/each}
	</div>
	<div class="container flex justify-center pb-10">
		<a class="text-base underline underline-offset-2 hover:no-underline" href="/pdf">
			{m.home_page_experiment_results()}
		</a>
	</div>
	<div class="flex flex-col justify-center overflow-hidden border-t py-10">
		<h3 class="z-20 py-10 text-center font-playfair text-6xl uppercase">
			{m.home_page_why_pick_us_title()}
		</h3>

		<div class="container flex justify-center pb-10">
			<WhyPickUsCarousel />
		</div>
	</div>
</div>
