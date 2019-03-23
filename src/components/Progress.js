import React from 'react';

import './Progress.css';

const getBarColor = (totalCompleted) => {
  if (totalCompleted > 0.8) return "#7dbd32";
  if (totalCompleted > 0.4) return "#efc030";
  return "#ed344e";
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
      <span className="number">{totalCompleted * 100}% completed!</span>
    </div>
  )
};

export default Progress;
