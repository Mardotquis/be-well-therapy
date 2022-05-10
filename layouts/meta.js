import React from 'react';
import Head from 'next/head';

// allows for dynamic <head> tags
export default function Meta({ title, description }) {
  const initialTitle = 'Be Well Therapy, PLLC';
  const initialDescription = 'The home of Be Well Therapy, PLLC';
  return (
    <Head>
      <link rel="icon" type="image/png" href="/img/favicon.png" />
      <title>{title ? `${title} | ${initialTitle}` : initialTitle}</title>
      <meta name="description" content={description || initialDescription} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
    </Head>
  );
}
