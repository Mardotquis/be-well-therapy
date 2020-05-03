/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import CTA from '../cta/cta';
import Custom from '../custom/custom';

export default function Header() {
  // text starts off with "New Clients "
  const subHeaderText = `, to get the most out of your initial appointment, please complete the following
                        forms and bring them to your first session along with your insurance card and any clinical
                        documentation that would be helpful to your Therapist in assisting you with developing
                        solutions.`;

  /** ********
  because `target="_blank"  attribute isn't treated the same in every browser,
  you have to explicitly tell the window to open it
  ********* */
  function openInNewTab(url) {
    const win = window.open(url, '_blank');
    win.focus();
  }

  return (
    <section className="forms">
      <div className="forms__header">
        <h1 className="forms__header-lgtext">Contact Us</h1>
      </div>
      <div className="forms__subheader">
        <p className="forms__subheader-smtext">
          <span className="forms__subheader-smtext-green">New Clients</span>
          {subHeaderText}
        </p>
        <div className="forms__subheader__ctas">
          <a onClick={() => openInNewTab('/documents/Be-Well-Therapy-Forms.pdf')}>
            <CTA color="#D3D3D3">View Forms</CTA>
          </a>
          <Custom />
        </div>
      </div>
    </section>
  );
}
