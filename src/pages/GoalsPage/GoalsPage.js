import React, { Component } from 'react';
import { FirebaseDatabaseNode } from "@react-firebase/database";

import Loading from '../../components/Loading';

class GoalsPage extends Component {
  render() {
    const { userId } = this.props;
    return (
      <div>
        <h1> All goals > </h1>
        {
          userId ?
          <FirebaseDatabaseNode path={"companies"}>
            {companies => {
              console.log("companies", companies);
              return (
                companies.isLoading ? <Loading /> : 
                <div/>
              );
            }}
          </FirebaseDatabaseNode> :
          <Loading />
        }
      </div>
    );
  }
}

export default GoalsPage;
