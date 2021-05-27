import React, { useState, useEffect } from 'react';

import { useHistory } from 'react-router-dom';
import '../../src/App.css';

function StartGame({ username, setUserName, setDifficulty, difficulty }) {
  let history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();
    setUserName(e.target[0].value);
    console.log(e.target[0].value);
    history.push('/gameBoard');
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor='test'>User name</label>
        <input type='text' id='test' />
        <button type='submit'>StartGame</button>
      </form>
      <div className='difficultyWrapper'>
        <ul>
          <li onClick={() => setDifficulty('Easy')}>Easy</li>
          <li onClick={() => setDifficulty('Normal')}>Normal</li>
          <li onClick={() => setDifficulty('Hard')}>Hard</li>
          <p>Difficulty is: {difficulty}</p>
        </ul>
      </div>
    </>
  );
}

export default StartGame;
