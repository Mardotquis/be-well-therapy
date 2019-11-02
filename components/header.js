import React from 'react';

export default function Header({ heading, backgroundHeading }) {
  return (
    <header className="heading">
      <div className="heading__background-lgtext">{backgroundHeading}</div>
      <h1 className="heading-lgtext">
        {heading}
      </h1>
      <hr className="heading-lgtext_border_bottom" />
    </header>
  );
}
