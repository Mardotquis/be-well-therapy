import React, { useEffect } from 'react';
import Card from './card';
import { services } from '../../constants';
import useResize from '../../useResize';

const random = require('uuid/v4');

export default function Cards() {
  const { mobile, resizeFunc } = useResize(600);
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

  const displayCards = services.map((obj) => (
    <Card
      key={random()}
      header={obj.longerHeader || obj.header}
      backgroundImg={mobile ? obj.smRectangleBackgroundImg : obj.rectangleBackgroundImg}
      mainSentence={obj.mainSentence}
      modalInfo={obj.modalInfo}
      shortName={obj.shortName}
    />
  ));
  return (
    <section className="our_services__cards">
      {displayCards}
    </section>
  );
}
