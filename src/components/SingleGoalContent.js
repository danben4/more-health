import React from 'react';
import { FirebaseDatabaseMutation } from "@react-firebase/database";

import Progress from './Progress';
import SingleGoalButtons from './SingleGoalButtons';
import './SingleGoalContent.css';

class SingleGoalContent extends React.Component {
  render() {
    const { data, goal, userId, goalId } = this.props;
    return (
      <div className="singleGoal">
        <img alt="" src={goal.imageUrl} className="singleGoalImage" />
        <div className="singleGoalContent">
          <div className="singleGoalInnerContent">
            <div className="singleGoalName">
              <span>{goal.name}</span>
              <span>{goal.companyName}</span>
            </div>
            <div className="singleGoalDescription">{goal.description}</div>
            <div className="bottomContent">
              {
                ! data.value ?
                  <FirebaseDatabaseMutation
                    type="set"
                    path={"users/" + userId + "/usergoals/" + goalId}
                  >
                    {({runMutation}) => {
                      return (
                        <SingleGoalButtons
                          runMutation={runMutation}
                          goal={goal}
                        />
                      );
                    }}
                  </FirebaseDatabaseMutation> :
                  <div className="progressContent">
                    <Progress totalCompleted={data.value.totalCompleted} />
                  </div>
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default SingleGoalContent;
