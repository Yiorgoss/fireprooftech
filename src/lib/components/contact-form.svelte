<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import * as m from '$pg/messages';
	import { contactSchema, type ContactSchema } from '$lib/schema';
	import type { SuperValidated } from 'sveltekit-superforms';

	export let form: SuperValidated<ContactSchema>;
</script>

<Form.Root method="POST" class="w-full" {form} schema={contactSchema} let:config>
	<div class={`flex flex-col`}>
		<div class="flex h-full w-full flex-col min-w-[300px] gap-5">
			<Form.Field {config} name="name">
				<Form.Item class="">
					<Form.Label class="">{m.name()}</Form.Label>
					<Form.Validation class="inline" />
					<Form.Input class="focus:outline-border bg-foreground" />
				</Form.Item>
			</Form.Field>
			<Form.Field {config} name="email">
				<Form.Item>
					<Form.Label>{m.email()}</Form.Label>
					<Form.Validation class="inline " />
					<Form.Input class="bg-foreground" />
				</Form.Item>
			</Form.Field>
			<Form.Field {config} name="message">
				<Form.Item class=" basis-1/2  ">
					<Form.Label>{m.message()}</Form.Label>
					<Form.Validation class="inline " />
					<Form.Textarea class="w-full min-h-[200px] bg-foreground" />
				</Form.Item>
			</Form.Field>
		</div>
		<div class="pt-10 mx-auto">
			<Form.Button size="lg" variant="destructive" class="">{m.submit()}</Form.Button>
		</div>
	</div>
</Form.Root>
