import React from 'react';

import './SingleGoal.css';

const SingleGoal = ({goal}) => {
  console.log("single goal", goal);
  return (
    <div className="singleGoal">
      <div className="singleGoalDescription">{goal.description}</div>
      <img alt="" src={goal.imageUrl} className="singleGoalImage" /> :
    </div>
  )
};

export default SingleGoal;
