import React from 'react';
import Default from '../../layouts/default';
import Hero from '../../components/aboutUs/Hero';

export default function AboutUs() {
  return (
    <Default meta={{ title: 'About Us' }}>
      <Hero />
    </Default>
  );
}
