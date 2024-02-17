<script lang="ts">
	import { CldImage } from 'svelte-cloudinary';

	export let image = '';
	export let title = '';
	export let description = '';
	export let isInset = false;
</script>

<div class:md:ml-[35%]={isInset} class="py-10 container mx-auto flex justify-start">
	<div class="flex flex-col items-start md:items-center gap-6 md:flex-row">
		<div class=" min-h-[100px] md:h-[200px] md:w-[200px] min-w-[100px]">
			<CldImage
				class="rounded-full border-8 border-border"
				src={image}
				height={200}
				width={200}
				alt="test"
			/>
		</div>
		<div class="hidden h-2 w-2 rounded-full bg-border md:static"></div>
		<div class="relative h-10">
			<!-- height must match -->
			<div class="static md:absolute">
				<h4 class="relative flex h-10 w-[500px] items-start font-playfair text-2xl md:items-center">
					<!-- height must match -->
					{title}
					<div class="absolute -left-[250%] bottom-0 top-0 -z-10 w-[300vw] bg-blue-300">
						<!-- could be worse   -->
					</div>
				</h4>
				<div class="pt-4 max-w-xs">{description}</div>
			</div>
		</div>
	</div>
</div>
