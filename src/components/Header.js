import React from 'react';
import { Link } from "react-router-dom";

import './Header.css';

const Header = () => {
  return (
    <div className="header">
      <div className="innerHeader">
        <div className="headerBrandName">More health</div>
        <div className="headerLinks">
          <Link to="/activities/" className="headerLink">Activities</Link>
          <Link to="/goals/">All goals</Link>
          <Link to="/overview/">My goals</Link>
          <Link to="/settings/">Settings</Link>
          <span className="headerLink">Activities</span>
          <span className="headerLink">All goals</span>
          <span className="headerLink">My goals</span>
          <span className="headerLink">Settings</span>
        </div>
      </div>
    </div>
  )
};

export default Header;
