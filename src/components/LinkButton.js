import React from 'react';
import { Link } from "react-router-dom";

import './Button.css';

const LinkButton = ({to, children}) => {
  return (
    <div className="button">
      <Link to={to} className="reset">
        {children}
      </Link>
    </div>
  )
};

export default LinkButton;
