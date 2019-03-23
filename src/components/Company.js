import React from 'react';

import CompanyGoals from './CompanyGoals';
import './Company.css';

const Company = ({company}) => {
  return (

    <div className="company">
      <div className="companyName">{company.name}</div>
      <CompanyGoals goals={company.goals}/>
    </div>
  )
};

export default Company;
