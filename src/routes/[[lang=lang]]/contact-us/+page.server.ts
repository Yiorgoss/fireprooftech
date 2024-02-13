import type { Actions, PageServerLoad } from "./$types";
import { fail } from "@sveltejs/kit"
import { superValidate } from "sveltekit-superforms/server";
import { contactSchema } from "$lib/schema";

export const load: PageServerLoad = async () => {
  // console.log(contactSchema)
  return {
    form: await superValidate(contactSchema),
  };
}

export const actions: Actions = {
  default: async (event) => {
    const form = await superValidate(event, contactSchema);
    console.log(form)
    if (!form.valid) {
      return fail(400, {
        form,
      });
    }
    return {
      form,
    };
  },
};
