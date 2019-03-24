import React from 'react';
import { Link } from "react-router-dom";

import Progress from './Progress';
import RedeemCouponButton from './RedeemCouponButton';
import './Goal.css';


const Goal = ({goal, isCompanyGoal}) => {
  return (
    <Link to={"/goal?id=" + goal.id} className="goal">
      <div  className="goalContent">
        {
          isCompanyGoal ?
          <div className="companyGoalRightContent">
            <div className="goalName">{goal.name}</div>
            <div className="goalDescription">{goal.description}</div>
          </div> : 
          <div className="goalRightContent">
            <div className="goalName">{goal.name}</div>
            <div className="goalDescription">{goal.description}</div>
          </div>
        }
        
        <div className="goalLeftContent">
          <div className="goalCompany">{goal.companyName}</div>
          {
          isCompanyGoal ? 
          <div></div> :
          (
            goal.isComplete ?
            <RedeemCouponButton/> :
            <div className="goalProgress"><Progress totalCompleted={goal.totalCompleted} /></div> 
          )
          }
        </div>
      </div>
      <img alt="" src={goal.imageUrl} className="goalImage" /> :
    </Link>
  )
};

export default Goal;
