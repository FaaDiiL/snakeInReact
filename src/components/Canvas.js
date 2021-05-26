import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import BabySvg from '../img/baby-boy.svg'
import FoodSvg from '../img/beer.svg'

import '../App.css'

const Canvas = ({ userName, setScore, score}) => {
  const [bebis, setBebis] = useState(0)
//   const [moreBebis, setMoreBebis] = useState([bebis,1])
  const [food, setFood] = useState(0)
  const [currentDir, setCurrentDir] = useState('right')
  const [bodyLength, setBodyLength] = useState(1)
  const [bodyArr, setBodyArr] = useState([])
  let dir = 'right'
  let array = []
  let playerColors = ['red', 'green', 'blue']
  let number = 0
  let foodNum = 0
  let amountSquares = 272;
//   let moreBebis = []
  //let bodyArr = []
  useEffect(() => {
    foodNum = Math.floor(Math.random() * 272)
    setFood(foodNum)
    
    // ta bort från bodyArr element på slutet så att length = bodyLengt
    const init = async () => {
      // Sets the direction for the player
      await setInterval(() => {
        //bodyArr.unshift(Number(number));
        //bodyArr = [...bodyArr.filter((item, index) => (index <= bodyLength - 1))]
    //console.log(bodyArr)
   
        
        if (bodyLength > 1) {
          // bäbisen har precis käkat

        }
        if (dir == 'right') {
            let endofmap = false
            for(let i = 1; i < 16; i++){
                if(i * 16 == (number)) {
                endofmap = true
       /*          return endofmap */
                }
            }

        if(endofmap){
            number -= 16
        }
        

            if (number > 1022) return
            number += 1
        
        }
        if (dir == 'left') {
          if (number < 0) return (number == bebis)
                   let endofmap = false
            for(let i = 1; i < 16; i++){
                if(i * 16 == (number + 1)) {
                endofmap = true
       /*          return endofmap */
                }
            }
        
            console.log(endofmap)
        if(endofmap){
            number += 16
        }

          
          number -= 1
        }
        if (dir == 'up') {
        //   if (number < 16 || number == 0) return
               if (number < 16 ) {
                return number += (16 * 17)
            } else {
            
                number -= 16
            }
        }
        if (dir == 'down') {
            if (number > 272-17 ) {
           

                return number -= (16 * 17)
            } else {
            

                number += 16
            }
               
        }
        
        setBebis(number)
        
        // Move the player
        // if (tempNumber!= number){
        //     setBebis(tempNumber)
        
        // }
        // if Collision with food
        if (number == foodNum) {
            //setBodyLength(bodyLength + 1)
            foodNum = Math.floor(Math.random() * 272)
            setFood(foodNum)
            setScore((score += 10))
            bodyArr.push(number)
            // moreBebis.push('bebis')
            amountSquares -= 1
            buildMap()
        }
      }, 400)
    }

    init()
    
    
    // Player control
    window.addEventListener('keydown', (e) => {
        if (e.code == 'ArrowUp' || e.key == 'w'|| e.key == 'W' ) {
            if(dir == 'down') return;
        dir = 'up'
      } else if (e.code == 'ArrowDown' || e.key == 's' || e.key == 'S') {
        if(dir == 'up') return;
        dir = 'down'
      } else if (e.code == 'ArrowLeft' || e.key == 'a' || e.key == 'A') {
        if(dir == 'right') return;
        dir = 'left'
        setCurrentDir(dir)
      } else if (e.code == 'ArrowRight' || e.key == 'd' || e.key == 'D') {
        if(dir == 'left') return;
        dir = 'right'
        setCurrentDir('right')
      }
    })
  }, [])

  // Builds the map
  const buildMap = () => {
    for (let i = 0; i < amountSquares; i++) {
        array.push(i)
      }
  }
  buildMap()
// return i === bebis ? (  bodyArr.includes(Number(i))
  return (
    <main>
      {array.map((item, i) => {
        return i === bebis ? ( 
            <Bebis key={i} src={BabySvg} dir={dir} />
        ) : i === food ? (
          <img key={i} src={FoodSvg} />
        ) : (
          <div key={i} className='square'></div>
        )
      })}
    </main>
  )
}


const Bebis = styled.img`
    transition: all 0.5s ease;
    transform: ${(props) => props.dir == 'down' ? 'scaleX(-1)' : 'rotateY(0deg)'};
    width: 50px;
  
`

export default Canvas
