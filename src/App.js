import React,{ useState } from 'react'
import './App.css';
import Canvas from './components/Canvas'
import StartGame from './components/StartGame'
import GameOver from './components/GameOver'
import {
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  const [score, setScore] = useState(0)
  const [userName, setUserName] = useState('User1')
  return (
    <div className="App">
      <Switch>
      <Route path="/startGame" >
        <StartGame userName={userName} setUserName={setUserName} />
      </Route>

      <Route path="/gameBoard">
          <div className="outer-wrapper">
            <div className="score-wrapper">
                  <h1>Baby Strength</h1>
                  <span>{score}</span>
            </div>
            
            <div>
            <Canvas userName={userName} setScore={setScore} score={score} />

            </div>

          </div>
      </Route>
      <Route path="/gameOver" >
        <GameOver />
      </Route>
      </Switch>
    </div>
  );
}

export default App;
