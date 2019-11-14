import React from 'react';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <p className="footer__text footer__text-left">
        &copy;
        {' '}
        {year}
        {' '}
        Be Well Therapy, PLLC.
      </p>
      {/* no copyright symbol? */}
      <p className="footer__text footer__text-right">“Think Well, Feel Well, and Be Well”</p>
    </footer>
  );
}
