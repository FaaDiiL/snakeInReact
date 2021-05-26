import React, {useState, useEffect} from 'react'

function GameOver({username, setUserName}) {
     function handleSubmit(e) {
          e.preventDefault()
          setUserName(e.target[0].value)
          console.log(e.target[0].value)
     }
     return (
          <div className="game-over-wrapper">  
               <label htmlFor="test">User name</label>
               <input type="text" id="test" />   
               <button type="submit">StartGame</button>      
          </div>
     )
}


export default GameOver
