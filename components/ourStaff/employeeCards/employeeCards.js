import React, { useEffect } from 'react';
import EmployeeCard from './employeeCard';
import { employees } from '../staffInfo';
import useResize from '../../useResize';

const random = require('uuid/v4');

export default function EmployeeCards() {
  const { mobile, resizeFunc } = useResize(800);
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

  const cards = employees.map((employee) => (
    <EmployeeCard
      key={random()}
      name={employee.name}
      certs={employee.certs}
      headshotPath={employee.headshotPath}
      headshotPosition={employee?.headshotPosition}
      modalInfo={employee.modalInfo}
      mobile={mobile}
    />
  ));
  return <section className="employee_cards">{cards}</section>;
}
