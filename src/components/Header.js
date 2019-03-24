import React from 'react';
import { Link } from "react-router-dom";

import './Header.css';

const Header = () => {
  return (
    <div className="header">
      <div className="innerHeader">
        <Link to="/overview/" className="headerBrandName">M O R E</Link>
        <div className="headerLinks">
          <Link to="/activities/" className="headerLink">Activities</Link>
          <Link to="/goals/" className="headerLink">All goals</Link>
          <Link to="/overview/" className="headerLink">My goals</Link>
        </div>
      </div>
    </div>
  )
};

export default Header;
