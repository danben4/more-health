import React from 'react';
import { FirebaseDatabaseNode, FirebaseDatabaseMutation } from "@react-firebase/database";

import Button from './Button';
import './SingleGoal.css';

const SingleGoal = ({goalId, goal, userId}) => {
  const seconds = 3600 * 24 * goal.duration;
  const today = Math.round((new Date()).getTime() / 1000);
  const endDate = today + seconds;
  return (
    <FirebaseDatabaseNode path={"users/" + userId + "/usergoals/" + goalId}>
      {data => {
        console.log("data", data);
        return (
          <>
            <div className="singleGoal">
              <div className="singleGoalDescription">{goal.description}</div>
              <img alt="" src={goal.imageUrl} className="singleGoalImage" /> :
            </div>
            {
              ! data.value ?
                <FirebaseDatabaseMutation
                  type="set"
                  path={"users/" + userId + "/usergoals/" + goalId}
                >
                  {({ runMutation }) => (
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
                  )}
                </FirebaseDatabaseMutation> :
                null
            }
          </>
        );
      }}
    </FirebaseDatabaseNode>
  )
};

export default SingleGoal;
