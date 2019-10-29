import React from 'react';
import Default from '../../layouts/default';
import Header from '../../components/forms/header/header';
import Content from '../../components/forms/content/content';
import Contact from '../../components/forms/contact/contact';

export default function Forms() {
  return (
    <Default meta={{ title: 'Forms' }}>
      <Header />
      <Content />
      <Contact />
    </Default>
  );
}
