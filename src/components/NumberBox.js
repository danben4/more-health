import React from 'react';

import './NumberBox.css';

const NumberBox = ({label, number, numberLabel}) => {
  return (
    <div className="numberBox">
      <div className="numberBoxLabel">{label}</div>
      <div className="numberBoxNumber">
        {number}
        <span className="numberBoxNumberLabel">{numberLabel}</span>
      </div>
    </div>
  )
};

export default NumberBox;
