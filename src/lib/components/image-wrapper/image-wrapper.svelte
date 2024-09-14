<script lang="ts">
	import { type ImgMetaType } from '$lib/components/image-wrapper';
	export let meta: ImgMetaType[] = [];
	// if there is only one, vite-imagetools won't wrap the object in an array
	if (!(meta instanceof Array)) meta = [meta];

	const sources = meta[0].sources;
	const fallback = meta[0].img;

	export let ignoreFallback = false;
	export let clickableImage = false;

	const fallbackW = ignoreFallback ? 'none' : '' + fallback.w + 'px';

	export let sizes = '100vw';
	export let alt = '';
	export let loading: 'lazy' | 'eager' | null | undefined = 'lazy';

	export let imageClass = '';
	export let pictureClass = '';

	let overlayHidden = true;
</script>

<div class="relative h-full" style={`max-width: ${fallbackW};`}>
	<picture class={pictureClass}>
		{#each Object.entries(sources) as [type, srcMeta]}
			<source type="image/{type}" {sizes} srcset={srcMeta} />
		{/each}
		<img src={fallback.src} {alt} {loading} class={imageClass} />
	</picture>
	{#if clickableImage}
		<a
			href="#imageOverlay"
      id="imageOverlay"
			class="hidden md:block absolute inset-0 "
			on:click={() => (overlayHidden = !overlayHidden)}
		>
			<div
				class:hidden={overlayHidden}
				class="fixed inset-0 z-40 flex items-center justify-center backdrop-blur-lg"
			>
				<div class=" flex h-4/5 w-4/5 items-center justify-center overflow-hidden">
					<img src={fallback.src} {alt} loading="lazy" class="object-contain" />
				</div>
			</div>
		</a>
	{/if}
</div>

<!-- <style> -->
<!-- 	.overlay { -->
<!--     fixed -->
<!-- 		height: 100%; -->
<!-- 		width: 100%; -->
<!-- 		background: black; -->
<!-- 		opacity: 20%; -->
<!-- 	} -->
<!-- </style> -->
