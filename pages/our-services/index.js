import React from 'react';
import Default from '../../layouts/default';
import Header from '../../components/header';
import Cards from '../../components/ourServices/cards/cards';

export default function OurServices() {
  return (
    <Default meta={{ title: 'Our Services' }}>
      <Header heading="Our Services" backgroundHeading="Services" />
      <Cards />
    </Default>
  );
}
