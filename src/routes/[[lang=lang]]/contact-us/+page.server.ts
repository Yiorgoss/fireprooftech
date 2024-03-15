import type { Actions, PageServerLoad } from './$types';
import { ZOHO_PASS } from '$env/static/private';
import { contactSchema } from '$lib/schema';
import { message, superValidate } from 'sveltekit-superforms';
import * as m from '$pg/messages';
import { zod } from 'sveltekit-superforms/adapters';
import nodemailer from 'nodemailer';
import { render } from '@react-email/render';
import InquiryEmail from "$lib/emails"
import { isRTL, withoutLanguageTag } from '$lib/i18n-routing';
import { sourceLanguageTag } from '$pg/runtime';

export const load: PageServerLoad = async () => {
  return {
    form: await superValidate(zod(contactSchema))
  };
};
async function sendClientEmail(email: string, { lang, dir }: { lang: string, dir: string }) {
  const htmlEmail = render(InquiryEmail({ lang: lang, dir: dir }));
  const textEmail = render(InquiryEmail({ lang: lang, dir: dir }), { plainText: true })

  const transporter = nodemailer.createTransport({
    host: 'smtp.zoho.eu',
    port: 587,
    auth: {
      user: 'automated@fireprooftech.co.il',
      pass: ZOHO_PASS
    }
  });
  const options = {
    from: `automated@fireprooftech.co.il`,
    to: email,
    subject: m.email_verification_subject(),
    html: htmlEmail,
    text: textEmail
  };

  try {
    await transporter.sendMail(options);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

async function sendInternalEmail({ name, message, email }: { name: string, message: string, email: string }) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.zoho.eu',
    port: 587,
    auth: {
      user: 'automated@fireprooftech.co.il',
      pass: ZOHO_PASS
    }
  });
  const options = {
    from: `automated@fireprooftech.co.il`,
    to: 'admin@fireprooftech.co.il',
    subject: 'New Email',
    html: `You have a new email from ${name}. <br/> messaage:<br/>${message} <br/> email: <br/>${email}`
  };

  try {
    await transporter.sendMail(options);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

export const actions: Actions = {
  default: async (event) => {
    const form = await superValidate(event, zod(contactSchema));
    if (!form.valid) {
      return message(form, { status: 'error', text: m.FORM_ERROR_NOT_VALID() });
    }
    let lang = event.url.pathname.split('/')[1]
    let dir = isRTL(lang) ? 'rtl' : 'ltr'

    console.log(lang, dir)

    const clientEmail = await sendClientEmail(form.data.email, { lang: lang, dir: dir });
    const internalEmail = await sendInternalEmail(form.data)

    if (clientEmail && internalEmail) {
      return message(form, { status: 'success', text: m.FORM_SUCCESS() });
    }
    return message(form, { status: 'error', text: m.FORM_ERROR_EMAIL() });
  }
};
