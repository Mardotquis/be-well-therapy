import React, { useEffect } from 'react';
import Card from './card';
import { services } from '../../../constants';
import useResize from './useResize';

const random = require('uuid/v4');

function displayCards(mobile) {
  /** ********
   first filtering out the ones that belong on the homepage
   then mapping those out
  ********* */
  return services.filter((obj) => obj.homepage).map((obj) => (
    /** ********
    have to pass different sized backgroundImgs through props
    for different screen sizes
    ********* */
    // eslint-disable-next-line max-len
    <Card
      header={obj.header}
      subheader={obj.subheader}
      backgroundImg={mobile ? obj.smBackgroundImg : obj.backgroundImg}
      modalInfo={obj.modalInfo}
      key={random()}
    />
  ));
}

export default function Cards() {
  const { mobile, resizeFunc } = useResize(950);

  useEffect(() => {
    /** ********
    running the function first to find out the
    initial width
    ********* */
    resizeFunc();
    /** ********
    then attaching it to an event listener so that it runs
    whenever the window is resized
    ********* */
    window.addEventListener('resize', resizeFunc);
    return () => {
      window.removeEventListener('resize', resizeFunc);
    };
  }, []);

  return (
    <div className="home-maincontent__cards">
      {displayCards(mobile)}
    </div>
  );
}
