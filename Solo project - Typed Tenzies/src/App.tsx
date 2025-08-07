import { useEffect, useRef, useState } from "react";
import {generateNewDice, winCondition} from './utils/index';
import type { Die, gameSession } from "./types/types";
import DieComponent from "./components/DieComponent";
import GameButton from "./components/GameButton";
import Confetti from 'react-confetti';
import GameHistory from "./components/GameHistory";
import {toast} from 'react-hot-toast';
import AuthForm from "./components/AuthForm";

function App(): React.JSX.Element {
  const [die, setDie] = useState<Die[]>(generateNewDice);
  const winConditionVal: boolean = winCondition(die)
  const [rolls, setRolls] = useState<number>(0)
  const startTimeRef = useRef<number>(Date.now())
  const [gameSession, setGameSession] = useState<gameSession | null>(null);
  const [user, setUser] = useState(null)
  const [token, setToken] = useState<string | null>(null)
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const savedToken = localStorage.getItem('token')
    const savedUser = localStorage.getItem('user')
    if (savedToken && savedUser) {
      setToken(savedToken)
      setUser(JSON.parse(savedUser))
    }
  }, [])

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
    if(!winConditionVal) return
    const fetchData = async () => {
      try {
        if (!gameSession) return
        console.log("gameSession before fetch: ",gameSession)
        setLoading(true)
        console.log("error: ", error)
        const response = await fetch('http://localhost:5000/api/games',{
          method: 'POST',
          headers: { 'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(gameSession)
        })

        console.log("response.ok: ",response.ok)

        if (!response.ok) throw new Error(`Server error: ${response.status} ${response.statusText}`);

        const data = await response.json()
        console.log(data);
        setLoading(false)
      } catch (err) {
        console.error("Error saving session:", err);
        setError(true)
        setLoading(false)
        toast.error("Something went wrong while saving your session.")
      }
    }

    fetchData()

  }, [gameSession, winConditionVal])

  if (!user || !token) {
    return <AuthForm onAuthSuccess={(u, t) => { setUser(u); setToken(t) }} />
  }


  return (
    <div className="font-inter">
    {(winConditionVal && !error && !loading) && (
      <div className="fixed top-0 left-0 w-full h-full z-10 pointer-events-none">
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      </div>
    )}
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-white text-center flex flex-col items-center justify-center px-4 py-10 font-sans text-gray-800">
      <div className="w-full max-w-md mb-4">
          {(winConditionVal && !error && !loading) ? 
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
        <GameButton setDie={setDie} winConditionVal={winConditionVal} setRolls={setRolls} startTimeRef={startTimeRef} loading={loading}/>   
      </div>
    </div>
    {(winConditionVal && !error && !loading) && <GameHistory />}
    </div>
  )
}

export default App