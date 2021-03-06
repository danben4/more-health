import React, { Component } from 'react';
import { FirebaseDatabaseNode } from "@react-firebase/database";

import Page from '../../components/Page';
import Heading from '../../components/Heading';
import Loading from '../../components/Loading';
import EmptyResponse from '../../components/EmptyResponse';
import Goals from '../../components/Goals';
import Seperator from '../../components/Seperator';
import Activities from '../../components/Activities'

const filterActiveGoals = (goals) =>
  Object.keys(goals).map(
    key => {return {id: key, ...goals[key]}}
  ).filter(goal => {
    return new Date() < new Date(goal.endDate * 1000);
  });

const filterCompletedGoals = (activeGoals) => activeGoals.filter(goal => goal.totalCompleted >= 1);

const filterInCompletedGoals = (activeGoals) => activeGoals.filter(goal => goal.totalCompleted < 1);

const filterActivites = (activities) =>
  Object.keys(activities).map(
    key => {return {id: key, ...activities[key]}}
  ).slice(0, 5);

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
              if (! data.value) return<EmptyResponse text="No data :/" />;
              const activeGoals = data.value.usergoals ? filterActiveGoals(data.value.usergoals) : [];
              const inCompletedGoals = filterInCompletedGoals(activeGoals);
              const completedGoals = filterCompletedGoals(activeGoals);
              const activities = data.value.useractivities ? filterActivites(data.value.useractivities) : [];
              return (
                <>
                  <Heading text="My Goals" />
                  {
                    inCompletedGoals.length === 0 ?
                    <EmptyResponse text="No active goals!" /> :
                    <Goals goals={inCompletedGoals} isCompanyGoal={false}/>
                  }
                  <Seperator />
                  <Heading text="Completed Goals" />
                  {completedGoals.length === 0 ?
                    <EmptyResponse text="No completed goals!" /> :
                    <Goals goals={completedGoals} isCompanyGoal={false}/>
                  }
                  <Seperator />
                  <Heading text="My Activities" />
                  {activities.length === 0 ?
                    <EmptyResponse text="No recent activities!" /> :
                    <Activities activities={activities}/>
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
