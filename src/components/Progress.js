import React from 'react';

import './Progress.css';

const getBarColor = (totalCompleted) => {
  if (totalCompleted > 0.8) return "green";
  if (totalCompleted > 0.4) return "yellow";
  return "red";
};

const Progress = ({totalCompleted}) => {
  return (
    <div className="progress">
      <div 
        className="bar"
        style={{
          width: (totalCompleted * 100) + "%",
          backgroundColor: getBarColor(totalCompleted)
        }}
      />
      <span className="number">{totalCompleted * 100}%</span>
    </div>
  )
};

export default Progress;
