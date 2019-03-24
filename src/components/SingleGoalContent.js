import React from 'react';
import { FirebaseDatabaseMutation } from "@react-firebase/database";

import Progress from './Progress';
import Button from './Button';
import ShareButton from './ShareButton';
import './SingleGoalContent.css';
import RedeemButtonCoupon from './RedeemCouponButton';

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
              {
                ! data.value ?
                  <FirebaseDatabaseMutation
                    type="set"
                    path={"users/" + userId + "/usergoals/" + goalId}
                  >
                    {({runMutation}) => {
                      return (
                        <>
                          <div className="singleGoalPoints">
                            <div>- This goal is <span className="danger">not activated!</span></div>
                            <div>- <span className="importantNumber">287 users</span> already finished this goal!</div>
                            <div>- <span className="importantNumber">80% of users</span> finish this goal!</div>
                          </div>
                          <div className="bottomContent">
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
                          </div>
                        </>
                      );
                    }}
                  </FirebaseDatabaseMutation> :
                  <>
                    <div className="singleGoalPoints">
                      <div>- This goal is <span className="success">activated!</span></div>
                      <div>- <span className="importantNumber">287 users</span> already finished this goal!</div>
                      <div>- <span className="importantNumber">80% of users</span> finish this goal!</div>
                    </div>
                    <div className="bottomContent">
                      <div className="progressContent">
                        <ShareButton />
                        {
                          data.value.totalCompleted === 1 ?
                          <RedeemButtonCoupon/> :
                          data.value.totalCompleted === 0 ? null :
                            <div className="progressBar">
                              <Progress totalCompleted={data.value.totalCompleted} /> 
                            </div> 
                        }
                      </div>
                    </div>
                  </>
              }
          </div>
        </div>
      </div>
    );
  }
};

export default SingleGoalContent;
