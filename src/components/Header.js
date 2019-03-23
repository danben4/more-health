import React from 'react';
import { Link } from "react-router-dom";

import './Header.css';

const Header = () => {
  return (
    <div className="header">
      <div className="innerHeader">
        <Link to="/overview/" className="headerBrandName">More health</Link>
        <div className="headerLinks">
          <Link to="/activities/" className="headerLink">Activities</Link>
          <Link to="/goals/" className="headerLink">All goals</Link>
          <Link to="/overview/" className="headerLink">My goals</Link>
          <Link to="/settings/" className="headerLink">Settings</Link>
        </div>
      </div>
    </div>
  )
};

export default Header;
