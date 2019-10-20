import React from 'react';

export default function MainContentInfoWrapper({ children }) {
  return (
    <div className="home-maincontent__info ">
      <div className="home-maincontent__info__top_lines">
        <div className="home-maincontent__info_lines_vertical" />
        <div className="home-maincontent__info_lines_horizontal" />
      </div>
      {children}
      <div className="home-maincontent__info__bottom_lines">
        <div className="home-maincontent__info_lines_horizontal" />
        <div className="home-maincontent__info_lines_vertical" />
      </div>
    </div>
  );
}
