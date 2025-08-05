import { useEffect, useRef, useState } from "react";
import {generateNewDice, winCondition} from './utils/index';
import type { Die, gameSession } from "./types/types";
import DieComponent from "./components/DieComponent";
import GameButton from "./components/GameButton";
import Confetti from 'react-confetti';
import GameHistory from "./components/GameHistory";

function App(): React.JSX.Element {
  const [die, setDie] = useState<Die[]>(generateNewDice);
  const winConditionVal: boolean = winCondition(die)
  const [rolls, setRolls] = useState<number>(0)
  const startTimeRef = useRef<number>(Date.now())
  const [gameSession, setGameSession] = useState<gameSession | null>(null);
  const [error, setError] = useState<boolean>(false);

  console.log(error)

  useEffect(() => {
    if(!winConditionVal && error) return
      const session: gameSession = {
        rolls: rolls,
        duration: Math.floor((Date.now() - startTimeRef.current) / 1000),
        won: true,
        date: new Date()
        }

      setGameSession(session)
  }, [winConditionVal])

  useEffect(() => {
    if(!gameSession) return

    fetch('http://localhost:5000/api/games', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(gameSession)
      }).then(res => {
        if(!res.ok) throw new Error('Failed to save session')
        return res.json()
      })
      .then(console.log)
      .catch(error => setError(true))

      return (() => {
        setGameSession(null)
      })
    }, [gameSession])


  return (
    <div className="font-inter">
    {winConditionVal && (
      <div className="fixed top-0 left-0 w-full h-full z-10 pointer-events-none">
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      </div>
    )}
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-white text-center flex flex-col items-center justify-center px-4 py-10 font-sans text-gray-800">
      <div className="w-full max-w-md mb-4">
          {error && (
            <p className="text-sm text-red-500 mt-2 mb-2">
              Something went wrong while saving your session.
            </p>
          )}
          {(winConditionVal) ? 
          (
            <>
            <h1 className="text-4xl font-bold text-green-600 mb-2">🎉 You Won!</h1>
              <p className="text-base text-gray-700 leading-relaxed">
                All dice matched! Click <strong>Roll</strong> to play again.
              </p>
            </>
          ) : (
            <>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Tenzies</h1>
            <p className="text-base text-gray-600 leading-relaxed">
              Roll until all dice are the same. Click each die to freeze it at its current value between rolls.
            </p>
            </>
          )}
        </div>
      <div className="w-md min-h-64 mt-4 flex flex-col items-center justify-between">
        <DieComponent die={die} setDie={setDie} />
        <GameButton setDie={setDie} winConditionVal={winConditionVal} setRolls={setRolls} startTimeRef={startTimeRef} />   
      </div>
    </div>
    {winConditionVal && <GameHistory />}
    </div>
  )
}

export default App