import React, { Component } from 'react';
import { FirebaseDatabaseNode } from "@react-firebase/database";

import Heading from '../../components/Heading';
import Loading from '../../components/Loading';
import EmptyResponse from '../../components/EmptyResponse';
import Goals from '../../components/Goals';
import Seperator from '../../components/Seperator';

const filterActiveGoals = (goals) => Object.keys(goals).map(
  key => {
    return {
      key,
      ...goals[key]
    };
  }
);

// return Object.keys(goals).map(
//   key =>
//     <Goal key={key} goal={goals[key]} isCompanyGoal={false} />
// );

/*

const filterCompletedGoals = (goals) => "TODO";

const filterInCompletedGoals = (goals) => "TODO";

*/

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
              return (
                <>
                  <Heading text="Active Goals" />
                  <Goals goals={activeGoals} />
                  <Seperator />
                  <Heading text="Completed Goals" />
                  <Goals goals={activeGoals} />
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
