import React from 'react';
import Cards from './cards/cards';

export default function MainContent() {
  return (
    <section className="home-maincontent">
      <h2 className="home-maincontent__lgtext">Counseling for the entire family</h2>
      <hr className="home-maincontent__lgtext__border_bottom" />
      <Cards />
    </section>
  );
}
