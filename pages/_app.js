import React from 'react';
import '../public/App.scss';

// only setting up this _app to import the global scss file ^
export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
