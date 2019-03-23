import React from 'react';

import Goal from './Goal';
import './Goal.css';

const CompanyGoals = ({goals}) => {
  return Object.keys(goals).map(
    key =>
      <Goal key={key} goal={goals[key]} isCompanyGoal={true}  />
  );
};

export default CompanyGoals;
