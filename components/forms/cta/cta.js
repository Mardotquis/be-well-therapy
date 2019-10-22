import React from 'react';

export default function CTA({
  children, height, width, color,
}) {
  const overwrittenStyles = { height, width, backgroundColor: color };
  return (
    <button className="forms__cta" type="button" style={overwrittenStyles}>
      {children}
    </button>
  );
}
