import React from 'react';

const Activity = (activity) => {
  return (
    <div  className="activityContent">
      <div className="activityRightContent">
        <div className="activityName">{activity.activity.category}</div>
        <div className="activityDescription">Calories: {activity.activity.calories}</div>
      </div>
      <div className="activityLeftContent">
        <div className="activityDate">{new Date(activity.activity.date).toDateString()}</div>
      </div>
    </div>
  )
};

export default Activity;
