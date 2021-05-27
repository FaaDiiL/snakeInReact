import React, { useState } from 'react';
import './App.css';
import Canvas from './components/Canvas';
import StartGame from './components/StartGame';
import GameOver from './components/GameOver';
import { Switch, Route, Link } from 'react-router-dom';

function App() {
  const [score, setScore] = useState(0);
  const [difficulty, setDifficulty] = useState('Easy');
  const [userName, setUserName] = useState('User1');
  return (
    <div className='App'>
      <Switch>
        <Route exact path='/'>
          <h1>
            Welcome, let's begin the journey <a href='/startGame'>BEER</a>
          </h1>
        </Route>
        <Route path='/startGame'>
          <StartGame
            userName={userName}
            setUserName={setUserName}
            setDifficulty={setDifficulty}
            difficulty={difficulty}
          />
        </Route>

        <Route path='/gameBoard'>
          <div className='outer-wrapper'>
            <div className='score-wrapper'>
              <h1>Old man Strength</h1>
              <span>{score}</span>
              <span>{difficulty}</span>
            </div>
            {/* <span>{userName}</span> */}

            <div>
              <Canvas
                userName={userName}
                setScore={setScore}
                score={score}
                difficulty={difficulty}
              />
            </div>
          </div>
        </Route>
        <Route path='/gameOver'>
          <GameOver />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
