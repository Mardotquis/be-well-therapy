/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';

function Error() {
  return (
    <p>
      Page not found. Please go back
      {' '}
      <Link href="/"><a>home.</a></Link>
    </p>
  );
}

// redirect server back home if user hits invalid route/404 page
Error.getInitialProps = ({ res }) => {
  // TODO - maybe add some additional error handling?
  if (res && typeof res.writeHead === 'function') {
    res.writeHead(302, {
      Location: '/',
    });
    res.end();
  }
  return {};
};

export default Error;
