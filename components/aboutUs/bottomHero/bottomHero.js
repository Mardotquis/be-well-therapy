import React from 'react';

const random = require('uuid/v4');

export default function BottomHero() {
  const leftListItems = [
    'depression',
    'anxiety',
    'child behavior problems',
    'physical & sexual abuse',
    'ADHD',
  ];
  const rightListItems = [
    'bipolar disorder',
    'PTSD',
    'stress',
    'adjustment to medical illness',
    'financial burdens and much more', // TODO - ask him about another list item
  ];
  return (
    <div className="about_us__bottom_hero">
      <div className="about_us__bottom_hero_text_wrapper">
        <p className="about_us__bottom_hero_text_wrapper-lgtext"> Customized clinical treatment addresses healing & curing the underlying causes of</p>
        <div className="about_us__bottom_hero_text_wrapper_lists">
          <ul className="about_us__bottom_hero_text_wrapper_list-left">
            {leftListItems.map((item) => <li key={random()}>{item}</li>)}
          </ul>
          <ul className="about_us__bottom_hero_text_wrapper_list-right">
            {rightListItems.map((item) => <li key={random()}>{item}</li>)}
          </ul>
        </div>
      </div>
    </div>
  );
}
