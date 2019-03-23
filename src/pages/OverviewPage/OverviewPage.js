import React, { Component } from 'react';
import { FirebaseDatabaseNode } from "@react-firebase/database";

import Heading from '../../components/Heading';
import Loading from '../../components/Loading';
import EmptyResponse from '../../components/EmptyResponse';
import Goals from '../../components/Goals';
import Seperator from '../../components/Seperator';

/*
const filterActiveGoals = (goals) => "TODO";

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
              return (
                <>
                  <Heading text="Active Goals" />
                  <Goals goals={data.value.usergoals} />
                  <Seperator />
                  <Heading text="Completed Goals" />
                  <Goals goals={data.value.usergoals} />
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
