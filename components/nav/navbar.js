import React from 'react';
import MobileNavbar from './mobileNavbar';
import DesktopNavbar from './desktopNavbar';

// centralized place for both
export default function Navbar() {
  return (
    < >
      <DesktopNavbar />
      <MobileNavbar />
    </ >
  );
}
