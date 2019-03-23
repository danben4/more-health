import React, { Component } from 'react';
import { FirebaseDatabaseNode } from "@react-firebase/database";

import Heading from '../../components/Heading';
import Loading from '../../components/Loading';
import EmptyResponse from '../../components/EmptyResponse';
import Goals from '../../components/Goals';

const getGoals = (goals) =>
  Object.keys(goals).map(
    key => {return {id: key, ...goals[key]}}
  );

class GoalsPage extends Component {
  render() {
    const { userId } = this.props;
    return (
      <>
        <Heading text="Available goals" />
        {
          userId ?
          <FirebaseDatabaseNode path={"goals"}>
            {data => {
              if (data.isLoading) return <Loading />;
              if (! data.value) return <EmptyResponse text="No goals!" />;
              const goals = getGoals(data.value);
              return (
                <Goals goals={goals} isCompanyGoal />
              );
            }}
          </FirebaseDatabaseNode> :
          <Loading />
        }
      </>
    );
  }
}

export default GoalsPage;
