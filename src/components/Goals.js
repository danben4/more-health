import React from 'react';

import Goal from './Goal';
import './Goal.css';

const Goals = ({goals, isCompanyGoal}) => {
  return goals.map(
    goal =>
      <Goal key={goal.id} goal={goal} isCompanyGoal={isCompanyGoal}/>
  );
};

export default Goals;
