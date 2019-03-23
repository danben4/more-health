import React, { Component } from 'react';
import { FirebaseDatabaseNode } from "@react-firebase/database";

import Loading from '../../components/Loading';

class OverviewPage extends Component {
  render() {
    const { userId } = this.props;
    return (
      <div>
        Overview Page!
        {
          userId ?
          <FirebaseDatabaseNode path={"users/" + userId}>
            {data => {
              console.log("data", data);
              return (
                data.isLoading ? <Loading /> : <div />
              );
            }}
          </FirebaseDatabaseNode> :
          <Loading />
        }
      </div>
    );
  }
}

export default OverviewPage;
