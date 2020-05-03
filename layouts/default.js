import React from 'react';
import Meta from './meta';
import Navbar from '../components/nav/navbar';
import Footer from '../components/footer';

export default ({ children, meta }) => (
  < >
    <Meta {...meta} />
    <header>
      <Navbar />
    </header>
    <main>
      {children}
    </main>
    <Footer />
  </ >
);
