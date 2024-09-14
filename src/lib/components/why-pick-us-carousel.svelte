<script lang="ts">
	import * as m from '$pg/messages';
	import clock from '$lib/assets/icons/clock.png';
	import checkmark from '$lib/assets/icons/checkmark.svg';
	import leaves from '$lib/assets/icons/leaves.svg';
	import { Button } from './ui/button';
	const reasons = [
		{
			src: clock,
			needsBackground: true,
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

<div class="flex min-w-[600px] flex-col items-center justify-center rounded-sm bg-blue-900 py-10">
	{#each reasons as reason}
		<div class="flex items-center justify-center py-2 text-white">
			<div class="flex w-[300px] items-center justify-start">
				{#if reason.needsBackground}
					<div class="h-1 px-1"></div>
					<img
						class="w-[55px] rounded-full border border-black bg-white p-2"
						src={reason.src}
						alt="decorative"
					/>
					<div class="px-1 md:px-6">
						{reason.title}
					</div>
				{:else}
					<img class="w-full max-w-[70px]" src={reason.src} alt="decorative" />
					<div class="px-1 md:px-4">
						{reason.title}
					</div>
				{/if}
			</div>
		</div>
	{/each}
	<div class="pt-14">
		<Button variant="destructive" class="" size="lg">
			<a href="/contact-us">{m.contact_us()}</a>
		</Button>
	</div>
</div>
