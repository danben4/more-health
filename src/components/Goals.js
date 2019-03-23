import React from 'react';

import Goal from './Goal';
import './Goal.css';

const Goals = ({goals}) => {
  return goals.map(
    goal =>
      <Goal key={goal.key} goal={goal} isCompanyGoal={false} />
  );
};

export default Goals;
