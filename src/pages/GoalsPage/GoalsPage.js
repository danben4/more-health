import React, { Component } from 'react';
import { FirebaseDatabaseNode } from "@react-firebase/database";

import Page from '../../components/Page';
import Heading from '../../components/Heading';
import Loading from '../../components/Loading';
import EmptyResponse from '../../components/EmptyResponse';
import FilterGoals from '../../components/FilterGoals';

const getGoals = (goals) =>
  Object.keys(goals).map(
    key => {return {id: key, ...goals[key]}}
  );

class GoalsPage extends Component {
  render() {
    const { userId } = this.props;
    return (
      <Page>
        <Heading text="Available goals for activation" />
        {
          userId ?
          <FirebaseDatabaseNode path={"goals"}>
            {data => {
              if (data.isLoading) return <Loading />;
              if (! data.value) return <EmptyResponse text="No goals!" />;
              const goals = getGoals(data.value);
              return (
                <FilterGoals goals={goals} isCompanyGoal />
              );
            }}
          </FirebaseDatabaseNode> :
          <Loading />
        }
      </Page>
    );
  }
} 

export default GoalsPage;
