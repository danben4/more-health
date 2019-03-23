import React from 'react';

import './EmptyResponse.css';

const EmptyResponse = ({text}) => {
  return (
    <div className="error">{text}</div>
  )
};

export default EmptyResponse;
