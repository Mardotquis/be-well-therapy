import React from 'react';
import EmployeeCard from './employeeCard';
import { employees } from '../staffInfo';

const random = require('uuid/v4');

const cards = employees.map((employee) => (
  <EmployeeCard
    key={random()}
    name={employee.name}
    certs={employee.certs}
    headshotPath={employee.headshotPath}
    modalInfo={employee.modalInfo}
  />
));

export default function EmployeeCards() {
  return (
    <section className="employee_cards">
      {cards}
    </section>
  );
}
