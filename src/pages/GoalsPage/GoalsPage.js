import React, { Component } from 'react';
import { FirebaseDatabaseNode } from "@react-firebase/database";

import Heading from '../../components/Heading';
import Loading from '../../components/Loading';
import EmptyResponse from '../../components/EmptyResponse';
import Goal from '../../components/Goal';

class GoalsPage extends Component {
  render() {
    const { userId } = this.props;
    return (
      <div>
        <Heading text="Available goals" />
        {
          userId ?
          <FirebaseDatabaseNode path={"goals"}>
            {({value, isLoading}) => {
              return (
                isLoading ? 
                <Loading /> :
                  ! value ?
                    <EmptyResponse text="No active goals!" /> : 
                    Object.keys(value).map(
                      key => {
                        return <Goal key={key} goal={value[key]} isCompanyGoal ={true} /> }
                    )
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
