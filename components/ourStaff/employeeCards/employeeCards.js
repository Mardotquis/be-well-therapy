import React from 'react';
import EmployeeCard from './employeeCard';
import { employees } from '../staffInfo';

const cards = employees.map((employee) => (
  <EmployeeCard name={employee.name} certs={employee.certs} headshotPath={employee.headshotPath} modalInfo={employee.modalInfo} />
));

export default function EmployeeCards() {
  return (
    <section className="employee_cards">
      {cards}
    </section>
  );
}
