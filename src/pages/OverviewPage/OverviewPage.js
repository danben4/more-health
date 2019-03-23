import React, { Component } from 'react';
import { FirebaseDatabaseNode } from "@react-firebase/database";

import Heading from '../../components/Heading';
import Loading from '../../components/Loading';
import EmptyResponse from '../../components/EmptyResponse';
import Goals from '../../components/Goals';
import Seperator from '../../components/Seperator';

const filterActiveGoals = (goals) =>
  Object.keys(goals).map(
    key => {return {id: key, ...goals[key]}}
  ).filter(goal => new Date() < new Date(goal.endDate));

const filterCompletedGoals = (activeGoals) => activeGoals.filter(goal => goal.totalCompleted >= 1);

const filterInCompletedGoals = (activeGoals) => activeGoals.filter(goal => goal.totalCompleted < 1);

class OverviewPage extends Component {
  render() {
    const { userId } = this.props;
    return (
      <div>
        {
          userId ?
          <FirebaseDatabaseNode path={"users/" + userId}>
            {data => {
              if (data.isLoading) return <Loading />;
              if (! data.value) return <EmptyResponse text="No goals!" />;
              const activeGoals = filterActiveGoals(data.value.usergoals);
              let inCompletedGoals = filterInCompletedGoals(activeGoals);
              let completedGoals = filterCompletedGoals(activeGoals);
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
                    <Goals goals={completedGoals} />
                  }
                </>
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
