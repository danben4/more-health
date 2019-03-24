import React from 'react';

import './Filter.css';

const Filter = ({onClick, children, active}) => {
  return (
    <button onClick={onClick} className={"filter" + (active ? " activeFilter" : "")}>
      {children}
    </button>
  )
};

export default Filter;
