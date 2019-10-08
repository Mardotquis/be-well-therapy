import React from 'react';
import Meta from './meta';
import Navbar from '../components/navbar';

export default ({ children, meta }) => (
  <div>
    <Meta {...meta} />
    <Navbar />
    {children}
  </div>
);
