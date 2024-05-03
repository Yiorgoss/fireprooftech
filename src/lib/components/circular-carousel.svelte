<script lang="ts">
	import { ImageWrapper, type ImgMetaType } from '$lib/components/image-wrapper';

	export let images: ImgMetaType[] = [];
</script>

<div
	class="mx-auto my-auto aspect-square min-h-[300px] rounded-full ltr:pl-0 ltr:md:pl-10 rtl:pr-0 rtl:md:md:pr-10"
>
	<ImageWrapper
		imageClass="rounded-full border-8 object-cover w-full aspect-square"
		sizes="(min-width: 1000) 70vw, 40vw"
		meta={images}
		alt="landing hero image"
	/>
</div>
