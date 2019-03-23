import React, { Component } from 'react';

class GoalPage extends Component {
  render() {
    console.log("this.props.", this.props);
  //  let params = new URLSearchParams(this.props.location.search);
    return (
      <div>
        GoalPage!
      </div>
    );
  }
}

export default GoalPage;
