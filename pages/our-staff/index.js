import React from 'react';
import Default from '../../layouts/default';
import Header from '../../components/header';
import EmployeeCards from '../../components/ourStaff/employeeCards/employeeCards';

export default function OurStaff() {
  return (
    <Default meta={{ title: 'Our Staff' }}>
      <Header heading="Meet Our Team" backgroundHeading="Team" />
      <EmployeeCards />
    </Default>
  );
}
