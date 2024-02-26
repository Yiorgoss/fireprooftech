<script lang="ts">
	import * as m from '$pg/messages';
	import ContactForm from '$lib/components/contact-form.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div
	class="relative flex -mt-[100px] pt-[100px] min-h-lvh w-full items-center justify-center overflow-hidden bg-foreground text-background">
	<div class="absolute inset-0 z-10 grid md:grid-cols-5">
		{#each [1, 2, 3, 4, 5] as _}
			<div class=" border-l-[0.5px]"></div>
		{/each}
	</div>
	<div class="container z-20 py-10 ">
		<h1 class="font-playfair py-10 text-center text-6xl">{m.contact_page_heading()}</h1>
		<div class="flex flex-col-reverse md:flex-row w-full items-center justify-center">
			<div class="basis-1/2">
				<ContactForm form={data.form} />
			</div>
			<p class="basis-1/2 p-10">
				{m.contact_page_description()}
			</p>
		</div>
	</div>
</div>
