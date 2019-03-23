import React, { Component } from 'react';
import { FirebaseDatabaseNode } from "@react-firebase/database";

import Heading from '../../components/Heading';
import Loading from '../../components/Loading';
import EmptyResponse from '../../components/EmptyResponse';
import Goals from '../../components/Goals';

class OverviewPage extends Component {
  render() {
    const { userId } = this.props;
    return (
      <div>
        <Heading text="Active goals" />
        {
          userId ?
          <FirebaseDatabaseNode path={"users/" + userId}>
            {data => {
              console.log("data", data);
              return (
                data.isLoading ?
                  <Loading /> :
                  ! data.value ?
                    <EmptyResponse text="No active goals!" /> :
                    <Goals goals={data.value.usergoals} />
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
