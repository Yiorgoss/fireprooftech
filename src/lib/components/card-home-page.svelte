<script lang="ts">
	import { ImageWrapper, type ImgMetaType } from './image-wrapper';
	import { Button } from './ui/button';

	export let floatLeft;
	export let cardData: {
		title: string;
		image: ImgMetaType;
		content: {
			content?: string;
			isListItem?: boolean;
			isLinebreak?: boolean;
		}[];
		button?: {
			href: string;
			text: string;
		};
	};
</script>

<div class="px-16 py-10">
	<div class={`px-0 ${floatLeft ? 'pl-12' : 'pr-12'}`}>
		<div class="mx-auto grid min-h-[500px] w-full grid-cols-5 gap-3 bg-zinc-200 md:gap-10">
			<div
				class={`${floatLeft ? 'order-first' : 'order-first md:order-last'}  col-span-full bg-blue-900 p-2 md:col-span-2`}
			>
				<ImageWrapper meta={[cardData.image]} imageClass="object-cover h-full" />
			</div>
			<div class=" col-span-full flex flex-col justify-start px-6 md:col-span-3 md:px-10">
				<h3 class="pb-5 pt-10 text-2xl">{cardData.title}</h3>
				<ul class="flex-grow pb-10 text-base">
					{#each cardData.content as item}
						{#if item.isLinebreak}
							<li class="h-3"></li>
						{:else}
							<li class={`${item.isListItem ? 'ml-5 list-disc' : ''}`}>
								{item.content}
							</li>
						{/if}
					{/each}
				</ul>
				{#if cardData.button}
					<a class="py-5" href={cardData.button.href}>
						<Button size="lg" variant="destructive">{cardData.button.text}</Button>
					</a>
				{/if}
			</div>
		</div>
	</div>
</div>
