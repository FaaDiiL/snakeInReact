import React, {useState, useEffect} from 'react'

function StartGame({username, setUserName}) {
     function handleSubmit(e) {
          e.preventDefault()
          setUserName(e.target[0].value)
          console.log(e.target[0].value)
          
     }
     return (
          <form onSubmit={handleSubmit}>  
               <label htmlFor="test">User name</label>
               <input type="text" id="test" />   
               <button type="submit">StartGame</button>      
          </form>
     )
}


export default StartGame
