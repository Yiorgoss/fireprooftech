<script lang="ts">
	import ProductNav from '$lib/components/product-nav.svelte';
	import * as m from '$pg/messages';
	import ImageWrapper from '$lib/components/image-wrapper/image-wrapper.svelte';

	//@ts-ignore
	import landing from '$lib/assets/images/landing.jpg?3000&format=jpg&as=picture';
	//@ts-ignore
	import products_background from '$lib/assets/images/products_background.jpg?w=500;1000;1700;2500&format=avif;webp;jpg&as=picture';
	//@ts-ignore
  import products_image_1 from "$lib/assets/images/products_image_1.jpg?w=500;1000;1700;2500&format=avif;webp;jpg&as=picture"
	//@ts-ignore
  import products_image_2 from "$lib/assets/images/product_image_2.jpg?w=500;1000;1700;2500&format=avif;webp;jpg&as=picture"
	//@ts-ignore
  import landing_1 from "$lib/assets/images/landing_image.jpg?w=500;1000;1700;2500&format=avif;webp;jpg&as=picture"

	const titles = [
		{
			name: m.product_page_1_title(),
			image: products_image_1,
			description: {
				short: m.product_page_1_short(),
				full: [
					{
						content: m.product_page_1_content_1(),
						indent: false
					},
					{ skipLine: true },
					{
						content: m.product_page_1_content_2(),
						indent: false
					},
					{ skipLine: true },
					{
						content: m.product_page_1_content_3(),
						indent: false
					},
					{ skipLine: true },
					{
						content: m.product_page_1_content_4(),
						indent: false
					},
					{
						content: m.product_page_1_content_5(),
						indent: false
					}
				]
			}
		},
		{
			name: m.product_page_2_title(),
			image: landing_1,
			description: {
				short: m.product_page_2_short(),
				full: [
					{
						content: m.product_page_2_content_1(),
						indent: false
					},
					{ skipLine: true },
					{
						content: m.product_page_2_content_2(),
						indent: false
					},
					{ skipLine: true },
					{
						content: m.product_page_2_content_3(),
						indent: false
					}
				]
			}
		},
		{
			name: m.product_page_3_title(),
			image: products_image_2,
			description: {
				short: m.product_page_3_short(),
				full: [
					{
						content: m.product_page_3_content_1(),
						indent: false
					},
					{ skipLine: true },
					{
						content: m.product_page_3_content_2(),
						indent: true
					},
					{
						content: m.product_page_3_content_3(),
						indent: true
					},
					{ skipLine: true },
					{
						content: m.product_page_3_content_4(),
						indent: false
					},
					{ skipLine: true },
					{
						content: m.product_page_3_content_5(),
						indent: false
					}
				]
			}
		}
	];
</script>

<div class="-mt-[100px] min-h-svh pt-[100px] font-gothic">
	<div class=" bg-blue-300 fixed inset-0 bg-transparent -z-10 object-cover">
    <ImageWrapper imageClass="h-full w-full object-cover" meta={products_background} />
  </div>

	<div class="sticky top-0 z-20 w-full bg-foreground/50  backdrop-blur-md">
		<div class="flex h-14 items-center text-white justify-center gap-4">
			{#each titles as { name }}
				<a
					href={`#${name.replaceAll(' ', '_')}`}
					class="border-b-2 border-transparent px-2 pb-1 font-playfair leading-none transition-colors hover:border-background"
				>
					{name}
				</a>
			{/each}
		</div>
	</div>

	{#each titles as title}
		<div id={title.name.replace(' ', '_')} class="text-red-400 bg-transparent">
			<ProductNav {title} />
		</div>
	{/each}
</div>
