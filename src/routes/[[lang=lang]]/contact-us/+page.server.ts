import type { Actions, PageServerLoad } from './$types';
import { fail } from '@sveltejs/kit';
import { ZOHO_PASS } from '$env/static/private';
import { contactSchema, type ContactSchema } from '$lib/schema';
import { message, superValidate } from 'sveltekit-superforms';
import * as m from '$pg/messages';
import { zod } from 'sveltekit-superforms/adapters';
import nodemailer from 'nodemailer';

export const load: PageServerLoad = async () => {
  return {
    form: await superValidate(zod(contactSchema))
  };
};
async function sendEmails() {
  const transporter = nodemailer.createTransport({
    host: 'smtp.zoho.eu',
    port: 587,
    auth: {
      user: 'aadmin@fireprooftech.co.il',
      pass: ZOHO_PASS
    }
  });
  const options = {
    from: `automated@fireprooftech.co.il`,
    to: 'makridakisyiorgos@gmail.com',
    subject: 'This is a message',
    text: 'body of the email'
  };

  try {
    await transporter.sendMail(options);
    return true
  } catch (err) {
    console.log(err)
    return false
  }
}
export const actions: Actions = {
  default: async (event) => {
    const form = await superValidate(event, zod(contactSchema));
    if (!form.valid) {
      return message(form, { status: 'error', text: m.FORM_ERROR_NOT_VALID() });
    }
    const emailSent = await sendEmails();
    if (emailSent) {
      return message(form, { status: 'success', text: m.FORM_SUCCESS() });
    } else {
      return message(form, { status: 'error', text: m.FORM_ERROR_EMAIL() })
    }
  }
};
