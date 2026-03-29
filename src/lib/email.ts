import Mailgun from 'mailgun.js';
import FormData from 'form-data';
import { MAILGUN_API_KEY } from 'astro:env/server';

const mailgun = new Mailgun(FormData);
const mg = mailgun.client({ username: 'api', key: MAILGUN_API_KEY });

export async function sendContactEmail(name: string, email: string, message: string) {
    await mg.messages.create('mg.cyrusnimda.com', {
        to: 'contact@cyrusdev.co.uk',
        from: 'postmaster@mg.cyrusnimda.com',
        subject: `New contact from ${name} - cyrusdev.co.uk`,
        text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
        html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p>${message}</p>`,
    });
}
