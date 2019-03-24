import React from 'react';
import { FirebaseDatabaseNode } from "@react-firebase/database";

import SingleGoalContent from './SingleGoalContent';

class SingleGoal extends React.Component {
  render() {
    const { goalId, goal, userId } = this.props;
    return (
      <FirebaseDatabaseNode path={"users/" + userId + "/usergoals/" + goalId}>
        {data => {
          return (
            <SingleGoalContent
              data={data}
              goal={goal}
              userId={userId}
              goalId={goalId}
            />
          );
        }}
      </FirebaseDatabaseNode>
    );
  }
};

export default SingleGoal;
