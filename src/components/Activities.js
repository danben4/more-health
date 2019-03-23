import React from 'react';

import Activity from './Activity';

import './Activity.css'

const Activities = ({activities}) => {
  return activities.map(
    activity =>
      <Activity key={activity.id} activity={activity} />
  );
};

export default Activities;
