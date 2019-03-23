import React from 'react';

import Progress from './Progress';
import './Goal.css';

const Goal = ({goal, isCompanyGoal}) => {
  console.log("isCompanyGoal", isCompanyGoal)
  return (
    <div className="goal">
      <div  className="goalContent">
        <div className="goalRightContent">
          <div className="goalName">{goal.name}</div>
          <div className="goalDescription">{goal.description}</div>
        </div>
        <div className="goalLeftContent">
          <div className="goalCompany">{goal.companyName}</div>
          {
          isCompanyGoal ? 
          <div></div> :
          <div className="goalProgress"><Progress totalCompleted={goal.totalCompleted} /></div>
          }
        </div>
      </div>
      <img alt="" src={goal.imageUrl} className="goalImage" /> :
    </div>
  )
};

export default Goal;
