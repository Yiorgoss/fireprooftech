<script lang="ts">
	import { type ImgMetaType, ImageWrapper } from './image-wrapper';

	export let image: ImgMetaType;
	export let alt = '';
	export let title = '';
	export let description = '';
	export let isInset = false;
</script>

<div
	class:md:rtl:mr-[35%]={isInset}
	class:md:ml-[35%]={isInset}
	class="container mx-auto flex justify-start py-5"
>
	<div class="flex flex-col items-start gap-6 md:flex-row md:items-center">
		<div
			class="aspect-square h-[200px] w-[200px] rounded-full border-8 md:h-[200px] md:w-[200px]"
		>
			<ImageWrapper imageClass="object-cover w-full h-full rounded-full aspect-square" meta={[image]} {alt} />
		</div>
		<div class="hidden h-2 w-2 rounded-full bg-border md:static"></div>
		<div class="relative h-10">
			<!-- height must match -->
			<div class="static md:absolute">
				<h4 class="relative flex h-10 w-[500px] items-start font-playfair text-2xl md:items-center">
					<!-- height must match -->
					{title}
					<div class="absolute -left-[250%] bottom-0 top-0 -z-10 w-[300vw] bg-transparent md:bg-[#9EC0F2]">
						<!-- could be worse   -->
					</div>
				</h4>
				<div class="max-w-xs pt-4">{description}</div>
			</div>
		</div>
	</div>
</div>
