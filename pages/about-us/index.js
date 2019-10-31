import React from 'react';
import Default from '../../layouts/default';
import Hero from '../../components/aboutUs/hero';
import Mission from '../../components/aboutUs/mission/mission';

export default function AboutUs() {
  return (
    <Default meta={{ title: 'About Us' }}>
      <Hero />
      <Mission />
    </Default>
  );
}
