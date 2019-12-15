import React from 'react';

export default function CTA({
  children, height, width, color, type = 'button', submit,
}) {
  const overwrittenStyles = {
    height, width, backgroundColor: color,
  };
  return (
    // eslint-disable-next-line react/button-has-type
    <button className={`forms__cta ${submit ? 'forms__submit_btn' : ''}`} type={type} style={overwrittenStyles}>
      {children}
    </button>
  );
}
