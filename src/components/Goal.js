import React from 'react';

import Progress from './Progress';
import './Goal.css';

const Goal = ({goal}) => {
  return (
    <div className="goal">
      <div>{goal.name}</div>
      <div>{goal.description}</div>
      <Progress totalCompleted={goal.totalCompleted} />
    </div>
  )
};

export default Goal;
