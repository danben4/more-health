import React, { Component } from 'react';
import { FirebaseDatabaseNode } from "@react-firebase/database";

import Page from '../../components/Page';
import Loading from '../../components/Loading';
import Heading from '../../components/Heading';
import SingleGoal from '../../components/SingleGoal';

class GoalPage extends Component {
  render() {
    const { location, userId } = this.props;
    const params = new URLSearchParams(location.search);
    const goalId = params.get("id");
    return (
      <Page>
        <FirebaseDatabaseNode path={"goals/" + goalId}>
          {data => {
            if (data.isLoading || ! data.value) return <Loading />;
            const goal = data.value;
            return (
              <>
                <Heading text={goal.name} />
                <SingleGoal goalId={goalId} goal={goal} userId={userId} />
              </>
            );
          }}
        </FirebaseDatabaseNode>
      </Page>
    );
  }
}

export default GoalPage;
