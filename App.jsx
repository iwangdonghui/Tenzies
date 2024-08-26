import React from 'react'
import Dice from './Dice'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'


function App() {
  const [dice, setDice] = React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false)
  const [rolls, setRolls] = React.useState(0)
  const [playTime, setPlayTime] = React.useState(0)

  React.useEffect(() => {
      const allHeld = dice.every(die => die.isHeld) // every() will return a boolean
      const firstValOfDice = dice[0].value
      //compare the rest value of the first value in dice array
      const sameVal = dice.every(die => die.value === firstValOfDice)
      if (allHeld && sameVal) {
        setTenzies(true)
      }
  }, [dice])

    // Added timer logic
    React.useEffect(() => {
      // Check if tenzies is true or if rolls is 0 (game not started yet)
      if (tenzies || rolls === 0) {
        return;
      }
  
      // Start the timer using setInterval
      const timer = setInterval(() => {
        setPlayTime((prevTime) => prevTime + 1);
      }, 1000);
  
      // Clean up the timer when the component unmounts or the game ends
      return () => clearInterval(timer);
    }, [tenzies, rolls, setPlayTime]);


  function allNewDice(){
    const newObjArr = []
    for(let i = 0; i < 10; i++) {
      newObjArr.push({
        value: Math.floor(Math.random() * 6) + 1,
        isHeld: false,
        id: nanoid()
      })
    }
    return newObjArr
  }

  function rollDice() {
    if(!tenzies) {
        setDice(oldDice => oldDice.map(die => 
          die.isHeld ? die : 
          {
            value: Math.floor(Math.random() * 6) + 1,
            isHeld: false,
            id: nanoid()
          }
        ))
        setRolls(oldRoll => oldRoll + 1)
    } else {
      setTenzies(false)
      setDice(allNewDice())
      setRolls(0)
      setPlayTime(0)
    }
    
  }

  function holdDice(id) {
    setDice(oldDice => oldDice.map(die => id === die.id ? {...die, isHeld: !die.isHeld}: die))
  }

  const diceElements = dice.map(die => <Dice 
    value={die.value} 
    key={die.id} 
    isHeld={die.isHeld}
    holdDice={() => holdDice(die.id)} 
    />)

  return (
      <main>
        {tenzies &&  <Confetti />}
        <h1>Tenzies</h1>
        <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className='wrapper'>
          {diceElements}
        </div>
        <button 
            className='rollBtn' 
            onClick={rollDice}
        >
          {tenzies ? "New Game": "Roll"}
        </button>
        <div className='gameInfo'>
            <section className='time'>Time: {playTime} {playTime > 1 ? "seconds" : "second"}</section>
            <section className='count'>Rolls: {rolls} {rolls > 1 ? "times" : "time"}</section>
        </div>
      </main>
  )
}

export default App
