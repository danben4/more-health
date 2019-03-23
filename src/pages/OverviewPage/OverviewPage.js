import React, { Component } from 'react';
import { FirebaseDatabaseNode } from "@react-firebase/database";

import Heading from '../../components/Heading';
import Loading from '../../components/Loading';
import EmptyResponse from '../../components/EmptyResponse';
import Goals from '../../components/Goals';
import Seperator from '../../components/Seperator';

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
        <Seperator />
        <Heading text="Completed goals" />
      </div>
    );
  }
}

export default OverviewPage;
