import React from 'react';
import Input from './input';
import useInput from './useInput';
import CTA from '../cta/cta';
import Form from './form';

export default function Contact() {
  // initializing the hook once to keep state in one central place
  const { bind, formState } = useInput();

  async function submitForm(event) {
    event.preventDefault();
    const formHelper = new Form(formState);
    if (!formHelper.validateInput()) return;
    await formHelper.sendData();
  }

  return (
    <div className="form__contact">
      <div className="form__contact_content">
        <h2 className="form__contact_content-header">Have questions for our counselors?</h2>
        <p className="form__contact_content-smtext">
          Complete the form fill below to send us any questions, comments or
          concerns you may have about our practice or the
          counseling services we offer. A member of our team will be in touch with you shortly!
        </p>
        <form action="" className="form__contact_content_form_wrapper" onSubmit={submitForm}>
          <Input name="name" bind={bind} label="Your Name (required)" />
          <Input type="email" name="email" bind={bind} label="Your Email (required)" />
          <Input name="subject" bind={bind} label="Subject" />
          <Input name="message" bind={bind} label="Your Message" textarea />
          <CTA height="58px" width="100%" type="submit">Send</CTA>
        </form>
      </div>
    </div>
  );
}
