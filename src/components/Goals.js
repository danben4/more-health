import React from 'react';

import Goal from './Goal';
import './Goal.css';

const Goals = ({goals}) => {
  return Object.keys(goals).map(
    key =>
      <Goal key={key} goal={goals[key]} isCompanyGoal={false} />
  );
};

export default Goals;
