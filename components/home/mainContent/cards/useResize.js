import { useState } from 'react';

export default function useResize(mobileSize) {
  const [mobile, setMobile] = useState(false);

  function resizeFunc() {
    setMobile(window.innerWidth < mobileSize);
  }

  return { mobile, resizeFunc };
}
