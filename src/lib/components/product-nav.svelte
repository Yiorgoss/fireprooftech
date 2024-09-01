<script lang="ts">
	import * as m from '$pg/messages';
	import { ImageWrapper, type ImgMetaType } from './image-wrapper';


	interface TitleProps {
		name: string;
		image: ImgMetaType;
		description: {
			short: string;
			full: {
				content?: string;
				indent?: boolean;
				skipLine?: boolean;
			}[];
		};
	}

	export let title: TitleProps;
</script>

<svelte:head>
	<title>{m.about_page_head_title()}</title>
	<meta name="description" content={m.about_page_head_description()} />
</svelte:head>

<div class="font-medium ">
	<div class=" w-full z-10 relative">
		<ImageWrapper pictureClass="" imageClass="h-[500px] w-full object-cover" ignoreFallback={true} meta={[title.image]} />
    <!-- <div class="absolute  bg-slate-700/30 inset-0"></div> -->
	</div>
	<div class="pt-5 relative px-0 md:px-24">
		<div class="mt-0 bg-transparent min-h-[300px]  px-4 pb-10 text-background ">
			<div class="flex flex-col items-start md:items-end py-1 md:flex-row">
				<h2 class="px-0 md:px-2 pt-1 font-playfair text-3xl md:after:pl-2 md:after:content-['-']">
					{title.name}<span class=" text-lg font-thin"> &#174;</span>
				</h2>
				<div class="pt-1 text-xl">{title.description.short}</div>
			</div>
			<div class="py-3 px-10 text-lg text-gothic">
				{#each title.description.full as { content, indent, skipLine }}
					{#if skipLine}
						<div class="h-6"></div>
					{:else}
						<div class={`${indent ? 'pl-8' : ''} py-2`}>
							{content}
						</div>
					{/if}
				{/each}
			</div>
		</div>
	</div>
</div>
