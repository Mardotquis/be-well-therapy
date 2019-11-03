import React from 'react';
import EmployeeCard from './employeeCard';
import { employees } from '../staffInfo';

const random = require('uuid/v4');

const cards = employees.map((employee, index) => {
  // helps give Rolanda's card the full width
  if (index === 0) {
    return (
      <div className="employee_cards__first_card" key={random()}>
        <EmployeeCard
          name={employee.name}
          certs={employee.certs}
          headshotPath={employee.headshotPath}
          modalInfo={employee.modalInfo}
        />
      </div>
    );
  }
  // all others get normal width
  return (
    <EmployeeCard
      key={random()}
      name={employee.name}
      certs={employee.certs}
      headshotPath={employee.headshotPath}
      modalInfo={employee.modalInfo}
    />
  );
});

export default function EmployeeCards() {
  return (
    <section className="employee_cards">
      {cards}
    </section>
  );
}
