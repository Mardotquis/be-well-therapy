import React from 'react';
import '../public/App.scss';

// only setting up this _app to import the global scss file ^
export default function App({ Component, pageProps }) {
const GA_TRACKING_ID = 'UA-180172827-1';

  return (
  <>
    <script
      async
      src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
    />
    <script
      dangerouslySetInnerHTML={{
        __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_TRACKING_ID}', {
            page_path: window.location.pathname,
          });
        `,
      }}
    />
    <Component {...pageProps} />
  </> 
 )
  ;
}
