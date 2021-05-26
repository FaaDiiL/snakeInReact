import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import BabySvg from '../img/baby-boy.svg'
import FoodSvg from '../img/beer.svg'

import '../App.css'

const Canvas = ({ userName, setScore, score }) => {
  // length = current length och the baby
  const [length, setLength] = useState(1)
  // TODO - on food catch
  // setLength(length + 1)
  const PlayersStartPosition = 0
  const [player, setPlayer] = useState(["Bäbis","Bäbis"])
  const [food, setFood] = useState(3)
  const [currentDir, setCurrentDir] = useState('right')
  const [bodyArr, setBodyArr] = useState([])
//   setPlayer([...player, numer]
  //const [bodyLength, setBodyLength] = useState(1)

  let [direction,setDirection] = useState('right')
    let number= 0
    let foodNum = 0

  //Array to draw map and amount of squares to draw
  let mapDraw = []
  let amountSquares = 272
  //////////////////////////////////////////////////

  //End of row boolean
    let endOfRow = false

 function checkIfEndOfRow(number, dir){
          for (let i = 1; i < 16; i++) {
            if (i * 16 == number + 1) {
              endOfRow = true
            }
          }
          return endOfRow
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

  
  // interval - movement speed
  function Speed(difficulty) {
    let milliseconds
    switch (difficulty) {
      case 1:
      milliseconds = 400
        break;
      case 2: 
        milliseconds = 350
        break;
      case 3: 
        milliseconds = 250
        break;
      default:
      milliseconds = 400
        break;
    }
    
    //Game Loop - Keeps the player moving
    setInterval(() => {
    // Checks the direction of the player
        if (currentDir == 'right') {
        // End of row calculation
         checkIfEndOfRow(number, currentDir)
        !endOfRow ? number += 1 : number -= 16 
        }
        if (currentDir == 'left') {
          // End of row calculation
          checkIfEndOfRow(number, currentDir)
          !endOfRow ? number -= 1 : number += 16 
        }
        if (currentDir == 'up') {
          number < 16 ? number += 16 * 17 : number -= 16
        }
        if (currentDir == 'down') {
          number < 16 ? number -= 16 * 17 : number += 16
        }
    /////////////////////////////////////////////////
    }, milliseconds);
  }

  // Builds the map
  const buildMap = () => {
    for (let i = 0; i < amountSquares; i++) {
      mapDraw.push(i)
    }
  }

  const generateFood = ()=> {
    return Math.floor(Math.random() * 272)
  } 
   // TODO - Rita Banan, bäbis, food
  // TODO - 


  // Player control
  window.addEventListener('keydown', (e) => {
    if (e.code == 'ArrowUp' || e.key == 'w' || e.key == 'W') {
      if (currentDir == 'down') return
      setCurrentDir('up')
    } else if (e.code == 'ArrowDown' || e.key == 's' || e.key == 'S') {
      if (currentDir == 'up') return
      setCurrentDir('down')
    } else if (e.code == 'ArrowLeft' || e.key == 'a' || e.key == 'A') {
      if (currentDir == 'right') return
      setCurrentDir('left')
    } else if (e.code == 'ArrowRight' || e.key == 'd' || e.key == 'D') {
      if (currentDir == 'left') return
      setCurrentDir('right')
    }
  })



  useEffect(() => {
    // functions run on refresh
    Speed(3)
    buildMap()
    setFood(generateFood())

        // if Collision with food
        if (number == foodNum) {
          foodNum = Math.floor(Math.random() * 272)
          setFood(generateFood())
          setScore((score += 10))
          bodyArr.push(number - score / 10)
          let newArr = [...bodyArr]
          newArr.push(number - score / 10)
          setBodyArr(newArr)
          amountSquares -= 1
          
        }
  }, [])

  
  buildMap()
  // return i === bebis ? (  bodyArr.includes(Number(i))
  return (
    <main>
      { mapDraw.map((i) => ( <div key={i} className='square'></div> )) }
      {generateFood.map((i) => ( <img key={i} src={FoodSvg} /> ))}
    </main>
  )
}

const Bebis = styled.img`
  transition: all 0.5s ease;
  transform: ${(props) =>
    props.currentDir == 'down' ? 'scaleX(-1)' : 'rotateY(0deg)'};
  width: 50px;
`

export default Canvas
