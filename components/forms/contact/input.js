import React from 'react';

export default function Input({ name, bind }) {
  return (
    < >
      <label htmlFor={name} className="form__contact_content_form_wrapper_label">
        <input id={name} type="text" className="form__contact_content_form_wrapper_input" name={name} {...bind(name)} />
      </label>
    </ >
  );
}
