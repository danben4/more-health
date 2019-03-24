import React, { Component } from 'react';

import './HomePage.css';
import LinkButton from '../../components/LinkButton';

class HomePage extends Component {
  render() {
    return (
      <div className="homePageRoot">
        <div className="homePageContent">
          <div className="homePageWrapper">
            <div className="homePageLogo">More health</div>
            <div>
              <div className="homePageHeaderText">
                Get more out of your workout
              </div>
              <div className="homePageHeaderSubText">
                More health helps you reach your fitness goals while getting great deals at your favourite places!
              </div>
            </div>
          </div>
          <div className="logInButton">
            <LinkButton to="/overview/">
              Log in
            </LinkButton>
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
