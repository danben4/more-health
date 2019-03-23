import React from 'react';

import './SingleGoal.css';

const SingleGoal = ({goal}) => {
  console.log("single goal", goal);
  return (
    <div className="singleGoal">
      Single goal!
    </div>
  )
};

export default SingleGoal;
