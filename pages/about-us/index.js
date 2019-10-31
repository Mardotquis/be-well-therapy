import React from 'react';
import Default from '../../layouts/default';
import Hero from '../../components/aboutUs/hero';
import Mission from '../../components/aboutUs/mission/mission';
import BottomHero from '../../components/aboutUs/bottomHero/bottomHero';

export default function AboutUs() {
  return (
    <Default meta={{ title: 'About Us' }}>
      <Hero />
      <Mission />
      <BottomHero />
    </Default>
  );
}
