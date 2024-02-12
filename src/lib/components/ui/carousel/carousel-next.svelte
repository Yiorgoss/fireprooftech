<script lang="ts">
	import { Button, type Props, buttonVariants } from "$lib/components/ui/button/index.js";
	import { cn } from "$lib/utils";
	import { ChevronRight } from "lucide-svelte";
	import type { VariantProps } from "tailwind-variants";
	import { getEmblaContext } from "./context.js";

	type $$Props = Props;

	let className: $$Props["class"] = undefined;
	export { className as class };
	export let variant: VariantProps<typeof buttonVariants>["variant"] = "outline";
	export let size: VariantProps<typeof buttonVariants>["size"] = "icon";
  export let arrowClass: string = 'w-4 h-4'

	const { orientation, canScrollNext, scrollNext, handleKeyDown } =
		getEmblaContext("<Carousel.Next/>");
</script>

<Button
	{variant}
	{size}
	class={cn(
		"absolute h-8 w-8 rounded-full touch-manipulation",
		$orientation === "horizontal"
			? "-right-12 top-1/2 -translate-y-1/2"
			: "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
		className
	)}
	disabled={!$canScrollNext}
	on:click={scrollNext}
	on:keydown={handleKeyDown}
	{...$$restProps}
>
	<ChevronRight class={arrowClass} />
	<span class="sr-only">Next slide</span>
</Button>
