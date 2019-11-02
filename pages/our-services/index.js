import React from 'react';
import Default from '../../layouts/default';
import Header from '../../components/header';
import Cards from '../../components/ourServices/cards/cards';

export default function Forms() {
  return (
    <Default meta={{ title: 'Forms' }}>
      <Header heading="Our Services" backgroundHeading="Services" />
      <Cards />
    </Default>
  );
}
