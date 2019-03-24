import React from 'react';
import { FirebaseDatabaseNode, FirebaseDatabaseMutation } from "@react-firebase/database";

import Button from './Button';
import Progress from './Progress';
import './SingleGoal.css';

const SingleGoal = ({goalId, goal, userId}) => {
  const seconds = 3600 * 24 * goal.duration;
  const today = Math.round((new Date()).getTime() / 1000);
  const endDate = today + seconds;
  return (
    <FirebaseDatabaseNode path={"users/" + userId + "/usergoals/" + goalId}>
      {data => {
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
                              <Button
                                onClick={() => {
                                  console.log("WAT")
                                }}
                              >
                                Share
                              </Button>
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
                        <Progress totalCompleted={data.value.totalCompleted} />
                      </div>
                  }
                </div>
              </div>
            </div>
          </div>
        );
      }}
    </FirebaseDatabaseNode>
  )
};

export default SingleGoal;