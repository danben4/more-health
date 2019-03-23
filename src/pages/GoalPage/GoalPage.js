import React, { Component } from 'react';
import { FirebaseDatabaseNode } from "@react-firebase/database";

import Loading from '../../components/Loading';
import Heading from '../../components/Heading';
import SingleGoal from '../../components/SingleGoal';

class GoalPage extends Component {
  render() {
    const params = new URLSearchParams(this.props.location.search);
    const goalId = params.get("id");
    console.log("goalId", goalId);
    return (
      <FirebaseDatabaseNode path={"goals/" + goalId}>
        {data => {
          if (data.isLoading || ! data.value) return <Loading />;
          const goal = data.value;
          return (
            <>
              <Heading text={goal.name} />
              <SingleGoal goal={goal} />
            </>
          );
        }}
      </FirebaseDatabaseNode>
    );
  }
}

export default GoalPage;
