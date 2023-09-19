import Script from 'next/script';

const GoogleTagManagerHead = () => {
  const measurementId = 'UA-180172827-1';

  return (
  <>
    <Script src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`} strategy="beforeInteractive" />
    <Script strategy="beforeInteractive">{`
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        dataLayer.push(arguments);
      }
      gtag('js', new Date());
      gtag('config', '${measurementId}');
    `}</Script>
  </>
)};

export default GoogleTagManagerHead;
