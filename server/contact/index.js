const nodemailer = require('nodemailer');

const {
  HOST, CONTACT_EMAIL, CONTACT_PASS, EMAIL,
} = process.env;

const transport = nodemailer.createTransport({
  host: HOST,
  port: 2525,
  auth: {
    user: CONTACT_EMAIL,
    pass: CONTACT_PASS,
  },
});

exports.sendEmail = async function sendEmail(body) {
  const {
    name, email, subject, message,
  } = body;
  if (!name || !email) throw new Error('Missing body values: \n', body);

  const formOutput = `
  <h1>New Contact Request!</h1>
      <ul>
          <li>Name: ${name}</li>
          <li>Email: ${email}</li>
      </ul>
  ${subject ? `<h2>Subject: ${subject}</h2>` : ''}
  ${message ? `<h2>Message</h2>
      <p>${message}</p>` : ''}
  `;

  const mailOptions = {
    from: `"Be Well Therapy website", <${EMAIL}>`,
    to: 'marquis0403@gmail.com',
    subject: 'New Contact Request',
    replyTo: `${email}`,
    html: formOutput,
  };

  return transport.sendMail(mailOptions);
};
