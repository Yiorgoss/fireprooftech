<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import * as m from '$pg/messages';
	import { contactSchema, type ContactSchema } from '$lib/schema';
	import type { SuperValidated } from 'sveltekit-superforms';

	export let form: SuperValidated<ContactSchema>;
</script>

<Form.Root method="POST" class="w-full" {form} schema={contactSchema} let:config>
	<div class={`flex flex-col`}>
		<Form.Field {config} name="username">
			<div class="flex flex-col h-full w-full gap-5">
					<Form.Item class="">
						<Form.Label class="">{m.name()}</Form.Label>
						<Form.Validation class="inline" />
						<Form.Input class="bg-foreground" />
					</Form.Item>
					<Form.Item>
						<Form.Label>{m.email()}</Form.Label>
						<Form.Validation class="inline" />
						<Form.Input class="bg-foreground" />
					</Form.Item>
				<Form.Item class=" basis-1/2 ">
					<Form.Label>{m.message()}</Form.Label>
					<Form.Validation class="inline bg-red-400" />
					<Form.Textarea class="min-h-[200px] bg-foreground" />
				</Form.Item>
			</div>
		</Form.Field>
		<div class="pt-10">
			<Form.Button size='lg' class="float-right">{m.submit()}</Form.Button>
		</div>
	</div>
</Form.Root>
