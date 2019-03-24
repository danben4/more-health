import React from 'react';

import Goals from './Goals';
import Filter from './Filter';
import './FilterGoals.css';

class FilterGoals extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filters: [],
      initialGoals: props.goals,
      goals: props.goals,
    };
  }

  filter = value => {
    if (this.state.filters.includes(value)) {
      const filters = this.state.filters.filter(item => item !== value);
      const goals = filters.length === 0 ?
        this.state.initialGoals :
        this.state.initialGoals.filter(goal => filters.includes(goal.category));
      this.setState({
        filters: filters,
        goals: goals,
      })
    } else {
      this.state.filters.push(value);
      const goals = this.state.filters.length === 0 ?
        this.state.initialGoals :
        this.state.initialGoals.filter(goal => this.state.filters.includes(goal.category));
      this.setState({
        filters: this.state.filters,
        goals: goals,
      });
    }
  };

  render() {
    const { isCompanyGoal } = this.props;
    return (
      <>
        <div className="filters">
          <Filter
            active={this.state.filters.includes("Cycling")}
            onClick={() => this.filter("Cycling")}
          >
            Cycling
          </Filter>
          <Filter
            active={this.state.filters.includes("Run")}
            onClick={() => this.filter("Run")}
          >
            Run
          </Filter>
          <Filter
            active={this.state.filters.includes("Workout")}
            onClick={() => this.filter("Workout")}
          >
            Workout
          </Filter>
        </div>
        <Goals goals={this.state.goals} isCompanyGoal={isCompanyGoal} />
      </>
    );
  }
};

export default FilterGoals;
