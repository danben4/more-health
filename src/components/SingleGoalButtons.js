import React from 'react';

import Button from './Button';
import './SingleGoalButtons.css';

class SingleGoalButtons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {shared: false};
  }

  render() {
    const { runMutation, goal } = this.props;
    const seconds = 3600 * 24 * goal.duration;
    const today = Math.round((new Date()).getTime() / 1000);
    const endDate = today + seconds;
    return (
      <div className="singleGoalButtons">
        <Button
          onClick={() => {
            this.setState({shared: true});
            this.forceUpdate();
          }}
        >
          {this.state.shared ? "Shared!" : "Share"}
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
              total: goal.metric,
            })
          }}
        >
          Activate goal!
        </Button>
      </div>
    );
  }
};

export default SingleGoalButtons;
