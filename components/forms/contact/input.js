import React from 'react';

export default function Input({
  type = 'text', name, bind, label, textarea = false,
}) {
  return (
    < >
      <label htmlFor={name} id={`label-${name}`} className="form__contact_content_form_wrapper_label">
        {label}
      </label>
      <span className="form__contact_content_form_wrapper_error" id={`error-${name}`} />
      {textarea
        ? <textarea id={name} type={type} className="form__contact_content_form_wrapper_textarea" name={name} {...bind(name)} />
        : <input id={name} type={type} className="form__contact_content_form_wrapper_input" name={name} {...bind(name)} />}
    </ >
  );
}
