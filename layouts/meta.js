import React from 'react';
import Head from 'next/head';

// allows for dynamic <head> tags
// TODO - change default info later
export default function Meta({ title, description }) {
  return (
    <Head>
      <title>{ title || 'Next.js Test Title' }</title>
      <meta name="description" content={description || 'Next.js Test Description'} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
    </Head>
  );
}
