import React from 'react';

import NumberBox  from './NumberBox';
import './Numbers.css';

const Numbers = () => {
  return (
    <div className="numbers">
      <NumberBox
        label="Completed goals this month"
        number="15"
        numberLabel="goals!"
      />
      <NumberBox
        label="Kilometers run this week!"
        number="30"
        numberLabel="km"
      />
      <NumberBox
        label="Goals finished"
        number="90"
        numberLabel="%"
      />
      <NumberBox
        label="Last run"
        number="10"
        numberLabel="km"
      />
    </div>
  )
};

export default Numbers;
