import React from 'react';
import Default from '../layouts/default';
import Hero from '../components/hero/hero';

export default function Home() {
  return (
    <Default meta={{ title: 'Home' }}>
      <Hero />
    </Default>
  );
}
// TODO - figure out 403's
