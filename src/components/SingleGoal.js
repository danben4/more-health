import React from 'react';

import Button from './Button';
import './SingleGoal.css';

const SingleGoal = ({goal}) => {
  console.log("single goal", goal);
  return (
    <>
      <div className="singleGoal">
        <div className="singleGoalDescription">{goal.description}</div>
        <img alt="" src={goal.imageUrl} className="singleGoalImage" /> :
      </div>
      <Button onClick={() => console.log("CLICK!!")}>
        Activate goal!
      </Button>
    </>
  )
};

export default SingleGoal;
