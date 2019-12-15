const nodemailer = require('nodemailer');

const {
  CURRENT_STAGE,
  DEV_HOST, DEV_CONTACT_EMAIL, DEV_CONTACT_PASS, DEV_EMAIL,
  PROD_HOST, PROD_CONTACT_EMAIL, PROD_CONTACT_PASS, PROD_EMAIL, PROD_SERVICE, PROD_RECIPIENT,
} = process.env;

let EMAIL;
let transport;
// recipient isn't needed for development
let RECIPIENT = 'notneeded@email.com';

if (CURRENT_STAGE === 'production') {
  EMAIL = PROD_EMAIL;
  RECIPIENT = PROD_RECIPIENT;
  transport = nodemailer.createTransport({
    service: PROD_SERVICE,
    host: PROD_HOST,
    auth: {
      user: PROD_CONTACT_EMAIL,
      pass: PROD_CONTACT_PASS,
    },
  });
} else {
  EMAIL = DEV_EMAIL;
  transport = nodemailer.createTransport({
    host: DEV_HOST,
    port: 2525,
    auth: {
      user: DEV_CONTACT_EMAIL,
      pass: DEV_CONTACT_PASS,
    },
  });
}


exports.sendEmail = async function sendEmail(body) {
  const {
    name, email, subject, message,
  } = body;
  if (!name || !email) throw new Error('Missing required body values: \n', body);

  const formOutput = `
  <style>*{font-family:Helvetica,sans-serif}h1{font-weight:600}h2{font-size:16px}h2 a, span{font-weight:400;font-size:14px}p{line-height:22px}</style>

  <h1>New Contact Request!</h1>

  <h2>Name: <span>${name}</span></h2>
  <h2>Email: <a href="mailto:${email}">${email}</a></h2>

  ${subject ? `<h2>Subject: <span>${subject}</span></h2>` : ''}

  ${message ? ` <h2>Message:</h2>
  <p>${message}</p>` : ''}
  `;

  const mailOptions = {
    from: `"Be Well Therapy, PLLC website", <${EMAIL}>`,
    to: RECIPIENT,
    subject: 'New Contact Request',
    replyTo: `${email}`,
    html: formOutput,
  };

  return transport.sendMail(mailOptions);
};
