import React from 'react';
import Default from '../layouts/default';
import Hero from '../components/hero/hero';
import MainContent from '../components/home/mainContent/mainContent';

export default function Home() {
  return (
    <Default meta={{ title: 'Home' }}>
      <Hero />
      <MainContent />
    </Default>
  );
}
// TODO - figure out 403's
