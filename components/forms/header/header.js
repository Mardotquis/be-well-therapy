import React from 'react';
import CTA from '../cta/cta';

export default function Header() {
  const subHeaderText = `, to get the most out of your initial appointment, please complete the following
                        forms and bring them to your first session along with your insurance card and any clinical
                        documentation that would be helpful to your Therapist in assisting you with developing
                        solutions.`;
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
          <CTA color="#D3D3D3">Placeholder</CTA>
          <CTA>Placeholder 2</CTA>
        </div>
      </div>
    </section>
  );
}
