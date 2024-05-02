<script lang="ts">
	import * as m from '$pg/messages';
	import data from '$lib/assets/pdfs/7413203690 FIRE PROOF_fire test report.pdf';
</script>

<div class="-mt-[100px] h-svh bg-foreground text-white">
	<object
		type="application/pdf"
		title="Experiment Results EI30"
		{data}
		class="h-full w-full pt-[100px]"
	>
		<p class="flex flex-col px-10 pt-10">
			{m.no_pdf_plugin()}
			<a
				class="underline underline-offset-2 hover:no-underline"
				href="/experiment_results.pdf"
				download
			>
				{m.download_here()}
			</a>
		</p>
	</object>
</div>
