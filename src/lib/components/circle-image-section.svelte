<script lang="ts">
	import { CldImage } from 'svelte-cloudinary';

	export let image = '';
	export let title = '';
	export let description = '';
	export let isInset = false;
</script>

<div class:md:ml-32={isInset} class="container">
	<div class="flex flex-col md:flex-row items-center gap-6">
		<CldImage
			class="rounded-full border-8 border-border"
			src={image}
			height={200}
			width={200}
			alt="test"
		/>
		<div class="hidden h-2 w-2 rounded-full bg-border md:static"></div>
		<div class="relative h-10">
			<!-- height must match -->
			<div class="static md:absolute">
				<h4 class="relative flex h-10 items-start md:items-center text-xl">
					<!-- height must match -->
					{title}
					<div class="absolute -left-[150%] bottom-0 top-0 -z-10 w-[200vw] bg-blue-300">
						<!-- could be worse   -->
					</div>
				</h4>
				<p class="">{description}</p>
			</div>
		</div>
	</div>
</div>
