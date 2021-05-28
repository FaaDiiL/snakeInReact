import React from 'react';

const LeftAside = ({ score, difficulty, userName }) => {
  return (
    <div className='left-aside-wrapper'>
      <div className='score-wrapper'>
        <h1>Old man Strength {score}</h1>
        {/* <span>{score}</span> */}
      </div>
      <h3>Username: {userName ? userName : 'No name'}</h3>
      <h3>Diffuculty: {difficulty}</h3>
    </div>
  );
};

export default LeftAside;
