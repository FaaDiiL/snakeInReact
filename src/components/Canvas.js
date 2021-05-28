import React, { useEffect, useState, useRef } from 'react';
import useInterval from '@use-it/interval';
import styled from 'styled-components';
import BabySvg from '../img/back.svg';
import FoodSvg from '../img/beer.svg';
import BombSvg from '../img/bomb.svg';

import '../App.css';

const Canvas = ({ userName, setScore, score, difficulty }) => {
  // length = current length och the baby
  const [length, setLength] = useState(1);
  // TODO - on food catch
  // setLength(length + 1)
  const PlayersStartPosition = 0;
  const [player, setPlayer] = useState(['Bäbis', 'Bäbis']);
  const [food, setFood] = useState(Math.floor(Math.random() * 272));
  const [bomb, setBomb] = useState();
  const [currentDir, setCurrentDir] = useState('right');
  const [bodyArr, setBodyArr] = useState([0]);
  const [milliseconds, setMilliseconds] = useState(700);

  const [playerState, setPlayerState] = useState(0);
  const bodyArrVariable = [0];
  //   setPlayer([...player, numer]
  //const [bodyLength, setBodyLength] = useState(1)

  // let [direction, setDirection] = useState('right');
  let dir = 'right';
  let number = 0;
  let foodNum;
  //Array to draw map and amount of squares to draw
  let mapDraw = [];
  let amountSquares = 272;
  //////////////////////////////////////////////////

  //End of row boolean
  let endOfRow = false;

  function checkIfEndOfRow(number, dir) {
    for (let i = 1; i < 16; i++) {
      if (i * 16 == number + 1) {
        endOfRow = true;
      }
    }
    return endOfRow;
  }

  // length = current length och the baby
  // position = Wich square of the mapLevel the baby made a turn on ex. 25
  // Dir = Wich direction the palyer turned

  //   let moreBebis = []
  //let bodyArr = []
  /*
  useEffect(() => {
    funciton(length, position, dir){

    }
  },[dir]) */

  // Sets new satate for the array of body.
  //Takes food boolean as argument to grow if true
  const setNewBodyArrState = (food) => {
    let newBodyArray = [...bodyArr, playerState];
    if (!food) newBodyArray.shift();
    setBodyArr(newBodyArray);
  };

  const checkForCollisionAndMovePlayer = () => {
    let checkForLos = [...bodyArr];
    checkForLos.splice(0, 1);

    if (checkForLos.includes(playerState)) {
      alert('You lose');
    }

    // if Collision with food
    if (playerState == food) {
      setScore((score += 10));
      setFood(generateFood());
      // setNewBodyArrStateFood();
      setNewBodyArrState(true);
    } else {
      setNewBodyArrState();
    }
  };

  // interval - movement speed
  function Speed(difficulty) {
    switch (difficulty) {
      case 'Easy':
        setMilliseconds(700);
        console.log('easy');
        break;
      case 'Normal':
        setMilliseconds(500);
        console.log('Normal');
        break;
      case 'Hard':
        setMilliseconds(150);
        console.log('Hard');
        break;
      default:
        setMilliseconds(700);
        break;
    }
  }
  //Game Loop - Keeps the player moving
  useInterval(() => {
    // buildMap();
    // Checks the direction of the player
    if (currentDir == 'right') {
      // End of row calculation
      checkIfEndOfRow(playerState, dir);
      !endOfRow
        ? setPlayerState(playerState + 1)
        : setPlayerState(playerState - 16);
    }
    if (currentDir == 'left') {
      // End of row calculation
      checkIfEndOfRow(number, dir);
      setPlayerState(!endOfRow ? playerState - 1 : playerState + 16);
    }
    if (currentDir == 'up') {
      setPlayerState(
        playerState < 16 ? playerState + 16 * 17 : playerState - 16
      );
    }
    if (currentDir == 'down') {
      setPlayerState(
        playerState > 256 ? playerState - 16 * 17 : playerState + 16
      );
    }
    /////////////////////////////////////////////////
    checkForCollisionAndMovePlayer();
  }, milliseconds);

  // Builds the map
  const buildMap = () => {
    for (let i = 0; i < amountSquares; i++) {
      mapDraw.push(i);
    }
  };

  const generateFood = () => {
    return Math.floor(Math.random() * 272);
  };
  // TODO - Rita Banan, bäbis, food, speed
  useEffect(() => {
    // Player control
    window.addEventListener('keydown', (e) => {
      if (e.code == 'ArrowUp' || e.key == 'w' || e.key == 'W') {
        if (dir == 'down') return;
        dir = 'up';
        setCurrentDir(dir);
      } else if (e.code == 'ArrowDown' || e.key == 's' || e.key == 'S') {
        if (dir == 'up') return;
        dir = 'down';
        setCurrentDir(dir);
      } else if (e.code == 'ArrowLeft' || e.key == 'a' || e.key == 'A') {
        if (dir == 'right') return;
        dir = 'left';
        setCurrentDir(dir);
      } else if (e.code == 'ArrowRight' || e.key == 'd' || e.key == 'D') {
        if (dir == 'left') return;
        dir = 'right';
        setCurrentDir('right');
      }
    });

    // functions run on refresh
    Speed(difficulty);
    buildMap();
  }, []);

  buildMap();
  // return i === bebis ? (  bodyArr.includes(Number(i))
  //  return bodyArr.includes(i) ? (< Bebis key={i} src={BabySvg} /> ) : (
  //       <img key={i} src={FoodSvg} /> ) ? i == bomb (<img key={i} src={BombSvg} />)  (<div key={i} className='square'></div>
  return (
    <main>
      {mapDraw.map((i) => {
        return !bodyArr.includes(i) && i !== food && i !== bomb ? (
          <div key={i} className='square'></div>
        ) : i == food ? (
          <img key={i} src={FoodSvg} />
        ) : bodyArr.includes(i) ? (
          <Bebis currentDir={currentDir} key={i} src={BabySvg} />
        ) : (
          <img src={BombSvg} />
        );
        // return bodyArr.includes(i) ? (
        //   <Bebis key={i} src={BabySvg} />
        // ) : (
        // <img key={i} src={FoodSvg} />
        // );
      })}
    </main>
  );
};

const Bebis = styled.img`
  transition: all 0.5s ease;
  /* transform: ${(props) =>
    props.currentDir == 'left'
      ? 'rotateY(3.142rad)'
      : props.currentDir == 'up'
      ? 'rotateZ(-90deg)'
      : props.currentDir == 'down'
      ? 'rotateZ(90deg)'
      : 'none'}; */
  /* display: ${(props) => (props.currentDir == 'left' ? 'none' : 'block')}; */
  width: 50px;
`;

export default Canvas;
