<script lang="ts">
	import * as m from '$pg/messages';
	import ContactForm from '$lib/components/contact-form.svelte';
	import type { PageData } from './$types';
	import { contactInfo } from '$lib/siteConfig';

	export let data: PageData;
</script>

<svelte:head>
	<title>{m.contact_page_head_title()}</title>
	<meta name="description" content={m.contact_page_head_description()} />
</svelte:head>

<div
	class="relative -mt-[100px] flex min-h-lvh w-full items-center justify-center overflow-hidden bg-foreground pt-[100px] text-background"
>
	<div class="absolute inset-0 z-10 grid md:grid-cols-6">
		{#each [1, 2, 3, 4, 5, 6] as _}
			<div class=" h-full border-l border-border/50"></div>
		{/each}
	</div>
	<div class="container z-20 py-10">
		<h1 class="py-10 text-start font-playfair text-6xl uppercase">{m.contact_page_heading()}</h1>
		<div class="flex w-full flex-col-reverse items-start justify-center md:flex-row">
			<div class="basis-1/2 self-center">
				<ContactForm form={data.form} />
			</div>
			<div class="basis-1/2 p-10 leading-7">
				<p class="">{m.contact_page_description()}</p>
				<p class="pt-6">{m.contact_page_description_2()}</p>
				<p class="pt-6">{m.contact_page_description_3()}</p>
				<p class="pt-6 flex gap-3">
					{m.contact_page_description_4()}
          <span class="text-off-blue">{contactInfo[0].info} </span>
				</p>
				<div class="inline"></div>
			</div>
		</div>
	</div>
</div>
