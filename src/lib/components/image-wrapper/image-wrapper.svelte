<script lang="ts">
	import { type ImgMetaType } from '$lib/components/image-wrapper';
	export let meta: ImgMetaType[] = [];
	// if there is only one, vite-imagetools won't wrap the object in an array
	if (!(meta instanceof Array)) meta = [meta];

	const sources = meta[0].sources;
	const fallback = meta[0].img;

	export let sizes = '100vw';
	export let alt = '';
	export let loading: 'lazy' | 'eager' | null | undefined = 'lazy';

	export let imageClass = '';
	export let pictureClass = '';

	// console.log({sources:sources, meta: meta})
</script>

<div class="h-full" style={`max-width: ${fallback.w}px`}>
	<picture class={pictureClass}>
		{#each Object.entries(sources) as [type, srcMeta]}
			<source type="image/{type}" {sizes} srcset={srcMeta} />
		{/each}
		<img src={fallback.src} {alt} {loading} class={imageClass} />
	</picture>
</div>
<!-- srcset={srcMeta.map((m) => `${m.src} ${m.w}w`).join(', ')} -->
