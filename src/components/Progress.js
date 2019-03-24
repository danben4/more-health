import React from 'react';

import './Progress.css';

const getBarColor = (totalCompleted) => {
  if (totalCompleted > 0.8) return "#7dbd32";
  if (totalCompleted > 0.4) return "#efc030";
  return "#d50000";
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
      <span
        className="number"
      >
        {Math.round(totalCompleted * 100)}%
      </span>
    </div>
  )
};

export default Progress;
