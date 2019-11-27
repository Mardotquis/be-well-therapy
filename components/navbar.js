/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import ActiveLink from './activeLink';
import Logo from './logo';
import {
  googleMapsLink, phoneNum, fullAddress,
} from './constants';

export default function Navbar() {
  const [mobileNavContent, toggleMobileNavContent] = useState(true);
  useEffect(() => {
    // removing scroll for body when navbar is open
    if (mobileNavContent) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [mobileNavContent]);

  const toggleProps = {
    onClick: () => toggleMobileNavContent(!mobileNavContent),
    onKeyDown: () => toggleMobileNavContent(!mobileNavContent),
    role: 'document',
  };
  return (
    < >
      <nav className="nav">
        <Link href="/"><div className="nav__logo"><Logo /></div></Link>
        <div className="nav__content">
          <ul className="nav__content__links__list">
            <ActiveLink href="/about-us">
              <li className="nav__content__links__list-item">About Us</li>
            </ActiveLink>
            <ActiveLink href="/our-services">
              <li className="nav__content__links__list-item">Our Services</li>
            </ActiveLink>
            <ActiveLink href="/our-staff">
              <li className="nav__content__links__list-item">Our Staff</li>
            </ActiveLink>
            <ActiveLink href="/forms">
              <li className="nav__content__links__list-item">Forms</li>
            </ActiveLink>
          </ul>
          <div className="nav__content__info">
            <a className="nav__content__info-text nav__content__info-text-phn" href={`tel:${phoneNum}`}>{phoneNum}</a>
            <a href={googleMapsLink} className="nav__content__info-text" target="_blank" rel="noopener noreferrer">{fullAddress}</a>
          </div>
        </div>
      </nav>

      <nav className="nav_mobile">
        <div
          className={mobileNavContent ? 'nav_mobile__close_icon' : 'nav_mobile__hamburger_icon'}
          {...toggleProps}
        />
        <Link href="/"><div className="nav_mobile__logo"><Logo /></div></Link>
        {/* TODO - add actual content for these */}
        <div className="nav_mobile__content__info">
          <div className="nav_mobile__content__info-location">
            <span className="nav_mobile__content__info-location-icon" />
          </div>
          <div className="nav_mobile__content__info-phn">
            <span className="nav_mobile__content__info-phn-icon" />
          </div>
        </div>
        {/* if the value is false, the content is hidden */}
        <div className={`nav_mobile__content ${!mobileNavContent && 'nav_mobile__content-hidden'}`}>
          <div className="nav_mobile__content-wrapper">
            <ul className="nav_mobile__content__links__list">
              <ActiveLink href="/" mobile>
                <li className="nav_mobile__content__links__list-item">Home</li>
              </ActiveLink>
              <ActiveLink href="/about-us" mobile>
                <li className="nav_mobile__content__links__list-item">About Us</li>
              </ActiveLink>
              <ActiveLink href="/our-services" mobile>
                <li className="nav_mobile__content__links__list-item">Our Services</li>
              </ActiveLink>
              <ActiveLink href="/our-staff" mobile>
                <li className="nav_mobile__content__links__list-item">Our Staff</li>
              </ActiveLink>
              <ActiveLink href="/forms" mobile>
                <li className="nav_mobile__content__links__list-item">Forms</li>
              </ActiveLink>
            </ul>
          </div>
          <div
            className="nav_mobile__content-overlay"
            {...toggleProps}
          />
        </div>
      </nav>

    </ >
  );
}
