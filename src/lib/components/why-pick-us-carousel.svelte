<script lang="ts">
	import * as Carousel from '$lib/components/ui/carousel';
	import * as m from '$pg/messages';

	const reasons = [
		{
			src: 'icons/clock.svg',
			title: m.home_page_why_pick_us_one_subheading(),
			description: m.home_page_why_pick_us_one_description()
		},
		{
			src: 'icons/checkmark.svg',
			title: m.home_page_why_pick_us_two_subheading(),
			description: m.home_page_why_pick_us_two_description()
		},
		{
			src: 'icons/leaves.svg',
			title: m.home_page_why_pick_us_three_subheading(),
			description: m.home_page_why_pick_us_three_description()
		}
	];
</script>

<Carousel.Root class="w-full max-w-xs">
	<Carousel.Content>
		{#each reasons as reason, i}
			<Carousel.Item>
				<div class="p-1">
					<span class="text-4xl font-semibold">{i + 1}</span>
				</div>
			</Carousel.Item>
		{/each}
	</Carousel.Content>
	<Carousel.Previous />
	<Carousel.Next />
</Carousel.Root>
