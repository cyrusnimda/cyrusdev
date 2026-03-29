// import Mailgun from 'mailgun.js';
// import FormData from 'form-data';

// const mailgun = new Mailgun(FormData);
// const mg = mailgun.client({ username: 'api', key: process.env.MAILGUN_API_KEY });

// mg.messages.create('cyrusdev.co.uk', {
//     to: 'contact@cyrusdev.co.uk',
//     from: 'contact@cyrusnimda.com',
//     subject: 'Test email from cyrusdev.co.uk',
//     text: 'Test email working correctly',
//     html: '<strong>Test email working correctly</strong>',
// })
// .then(response => console.log(response))
// .catch(error => console.error(error));


import FormData from "form-data"; // form-data v4.0.1
import Mailgun from "mailgun.js"; // mailgun.js v11.1.0

async function sendSimpleMessage() {
  const mailgun = new Mailgun(FormData);
  const mg = mailgun.client({
    username: "api",
    key: process.env.MAILGUN_API_KEY || "API_KEY",
    // When you have an EU-domain, you must specify the endpoint:
    // url: "https://api.eu.mailgun.net"
  });
  try {
    const data = await mg.messages.create("mg.cyrusnimda.com", {
      from: "Cyrusdev <postmaster@mg.cyrusnimda.com>",
      to: ["Contact <contact@cyrusdev.co.uk>"],
      subject: "Hello Josu Ruiz",
      text: "Congratulations Josu Ruiz, you just sent an email with Mailgun! You are truly awesome!",
    });

    console.log(data); // logs response data
  } catch (error) {
    console.log(error); //logs any error
  }
}

sendSimpleMessage();