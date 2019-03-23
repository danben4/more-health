import React from 'react';

import './Header.css';

const Header = () => {
  return (
    <div className="header">
      <div className="innerHeader">
        <div className="headerBrandName">More health</div>
        <div className="headerLinks">
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
