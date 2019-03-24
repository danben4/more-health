import React from 'react';
import { FirebaseDatabaseMutation } from "@react-firebase/database";

import Progress from './Progress';
import Button from './Button';
import ShareButton from './ShareButton';
import './SingleGoalContent.css';

class SingleGoalContent extends React.Component {
  render() {
    const { data, goal, userId, goalId } = this.props;
    const seconds = 3600 * 24 * goal.duration;
    const today = Math.round((new Date()).getTime() / 1000);
    const endDate = today + seconds;
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
                        <div className="singleGoalButtons">
                          <ShareButton />
                          <Button
                            onClick={() => {
                              runMutation({
                                companyName: goal.companyName,
                                description: goal.description,
                                endDate: endDate,
                                imageUrl: goal.imageUrl,
                                isComplete: 0,
                                name: goal.name,
                                startDate: today,
                                totalCompleted: 0.0,
                                category: goal.category,
                                total: goal.metric,
                              })
                            }}
                          >
                            Activate goal!
                          </Button>
                        </div>
                      );
                    }}
                  </FirebaseDatabaseMutation> :
                  <div className="progressContent">
                    <ShareButton />
                    <div className="progressBar">
                      <Progress totalCompleted={data.value.totalCompleted} /> 
                    </div> 
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
