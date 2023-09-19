// pages/_document.js
import Document, { Html, Head, Main, NextScript } from 'next/document';
import GoogleTagManagerHead from '../components/GoogleTagManagerHead';

export default function Document() {

    return (
      <Html>
        <Head>
          <GoogleTagManagerHead />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
}
