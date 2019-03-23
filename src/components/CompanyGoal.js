import React from 'react';

import './CompanyGoal.css';

const CompanyGoal = ({goal}) => {
    return (
    <div className="goal">
      <div>{goal.name}</div>
      <div>{goal.description}</div>
      <button>Activate</button> 
    </div>
  )
};

export default CompanyGoal;
