import React from 'react';
import Input from './input';
import useInput from './useInput';


export default function Contact() {
  // initializing the hook once to keep state in one central place
  const { bind } = useInput();

  return (
    <div className="form__contact">
      <div className="form__contact_content">
        <h1 className="form__contact_content-header">Have questions for our counselors?</h1>
        <p className="form__contact_content-smtext">
          Complete the form fill below to send us any questions, comments or concerns you may have about our practice or the
          counseling services we offer. A member of our team will be in touch with you shortly!
        </p>
        <div className="form__contact_content_form_wrapper">
          <form action="">
            <Input name="name" bind={bind} />
            <Input name="email" bind={bind} />
            <Input name="subject" bind={bind} />
            <Input name="message" bind={bind} />
          </form>
        </div>
      </div>
    </div>
  );
}
