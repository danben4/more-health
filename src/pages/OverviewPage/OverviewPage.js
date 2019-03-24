import React, { Component } from 'react';
import { FirebaseDatabaseNode } from "@react-firebase/database";

import Page from '../../components/Page';
import Heading from '../../components/Heading';
import Loading from '../../components/Loading';
import EmptyResponse from '../../components/EmptyResponse';
import Goals from '../../components/Goals';
import Seperator from '../../components/Seperator';

const filterActiveGoals = (goals) =>
  Object.keys(goals).map(
    key => {return {id: key, ...goals[key]}}
  ).filter(goal => {
    return new Date() < new Date(goal.endDate * 1000);
  });

const filterCompletedGoals = (activeGoals) => activeGoals.filter(goal => goal.totalCompleted >= 1);

const filterInCompletedGoals = (activeGoals) => activeGoals.filter(goal => goal.totalCompleted < 1);

class OverviewPage extends Component {
  render() {
    const { userId } = this.props;
    return (
      <Page>
        {
          userId ?
          <FirebaseDatabaseNode path={"users/" + userId}>
            {data => {
              if (data.isLoading) return <Loading />;
              if (! data.value || ! data.value.usergoals) return <EmptyResponse text="No goals!" />;
              const activeGoals = filterActiveGoals(data.value.usergoals);
              const inCompletedGoals = filterInCompletedGoals(activeGoals);
              const completedGoals = filterCompletedGoals(activeGoals);
              return (
                <>
                  <Heading text="Active Goals" />
                  {
                    inCompletedGoals.length === 0 ?
                    <EmptyResponse text="No active goals!" /> :
                    <Goals goals={inCompletedGoals} />
                  }
                  <Seperator />
                  <Heading text="Completed Goals" />
                  {completedGoals.length === 0 ?
                    <EmptyResponse text="No completed goals!" /> :
                    <Goals goals={completedGoals} isCompanyGoal={false} />
                  }
                </>
              );
            }}
          </FirebaseDatabaseNode> :
          <Loading />
        }
      </Page>
    );
  }
}

export default OverviewPage;
