import React from 'react';

export default function CTA({
  children, height, width, color, type = 'button',
}) {
  const overwrittenStyles = { height, width, backgroundColor: color };
  return (
    // eslint-disable-next-line react/button-has-type
    <button className="forms__cta" type={type} style={overwrittenStyles}>
      {children}
    </button>
  );
}
