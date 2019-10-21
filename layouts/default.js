import React from 'react';
import Meta from './meta';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import '../public/App.scss';

export default ({ children, meta }) => (
  < >
    <Meta {...meta} />
    <Navbar />
    {children}
    <Footer />
  </ >
);
