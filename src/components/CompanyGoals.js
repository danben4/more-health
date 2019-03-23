import React from 'react';

import CompanyGoal from './CompanyGoal';
import './Goal.css';

const CompanyGoals = ({goals}) => {
  return Object.keys(goals).map(
    key =>
      <CompanyGoal key={key} goal={goals[key]} />
  );
};

export default CompanyGoals;
