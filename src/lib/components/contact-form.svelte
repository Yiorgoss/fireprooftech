<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import * as m from '$pg/messages';
	import { Input } from '$lib/components/ui/input';
	import { Textarea } from '$lib/components/ui/textarea';
	import { contactSchema, type ContactSchema } from '$lib/schema';
	import SuperDebug, { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { Loader } from 'lucide-svelte';
	import { toast } from 'svelte-sonner';

	export let data: SuperValidated<Infer<ContactSchema>>;

	const form = superForm(data, {
		validators: zodClient(contactSchema),
		delayMs: 0,
		timeoutMs: 5000,
	});

	const { form: formData, message, delayed, enhance } = form;
	$: if ($message && $message.text) {

		if ($message.status == 'success') {
			toast.success($message.text);
		}
		if ($message.status == 'error') {
			// toast.success('tarsitenarsotearnto',$message.text);
			toast.error($message.text);
		}
	}
</script>

<!-- <SuperDebug data={$formData} /> -->
<form method="POST" class="relative w-full" use:enhance>
	<!-- <Form.Root method="POST" class="w-full" {form} schema={contactSchema} let:config> -->
	{#if $delayed}
		<div class="absolute inset-0 flex items-center justify-center bg-foreground/50">
			<Loader />
		</div>
	{/if}
	<div class={`flex flex-col`}>
		<div class="flex h-full w-full min-w-[300px] flex-col gap-5">
			<Form.Field {form} name="name">
				<Form.Control let:attrs>
					<Form.Label class="">{m.name()}</Form.Label>
					<Input
						{...attrs}
						class="rounded-none bg-foreground focus:outline-border"
						bind:value={$formData.name}
					/>
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Field {form} name="email">
				<Form.Control let:attrs>
					<Form.Label class="">{m.email()}</Form.Label>
					<Input
						{...attrs}
						class="rounded-none bg-foreground focus:outline-border"
						bind:value={$formData.email}
					/>
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Field {form} name="message">
				<Form.Control let:attrs>
					<Form.Label class="">{m.message()}</Form.Label>
					<Textarea
						{...attrs}
						bind:value={$formData.message}
						class="min-h-[200px] w-full rounded-none bg-foreground"
					/>
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
		</div>
		<div class="mx-auto pt-10">
			<Form.Button size="lg" variant="destructive" class="">{m.submit()}</Form.Button>
		</div>
	</div>
</form>
