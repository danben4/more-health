import React, { Component } from 'react';

class GoalPage extends Component {
  render() {
    const params = new URLSearchParams(this.props.location.search);
    const id = params.get("id");
    console.log("id", id);
    return (
      <div>
        GoalPage!
      </div>
    );
  }
}

export default GoalPage;
