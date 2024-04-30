<script lang="ts">
	import * as m from '$pg/messages';
	import clock from '$lib/assets/icons/clock.svg';
	import checkmark from '$lib/assets/icons/checkmark.svg';
	import leaves from '$lib/assets/icons/leaves.svg';
	import { Button } from './ui/button';
	const reasons = [
		{
			src: clock,
			title: m.home_page_why_pick_us_one_subheading()
		},
		{
			src: leaves,
			title: m.home_page_why_pick_us_two_subheading()
		},
		{
			src: checkmark,
			title: m.home_page_why_pick_us_three_subheading()
		}
	];
</script>

<div class="flex min-w-[600px] flex-col items-center justify-center rounded-sm bg-off-blue py-10">
	{#each reasons as reason}
		<div class="flex items-center justify-center py-2">
			<div class="flex w-[300px] items-center justify-start">
				<img class="w-1/4 max-w-[70px]" src={reason.src} alt="decorative" />
				{reason.title}
			</div>
		</div>
	{/each}
	<Button variant="destructive" class="mt-10" size="lg">
    <a href="/contact-us">{m.contact_us()}</a>
  </Button>
</div>
