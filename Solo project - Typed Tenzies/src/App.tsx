import { useState } from "react";
import {generateNewDice, winCondition} from './utils/index';
import type { Die } from "./types/types";
import DieComponent from "./components/DieComponent";
import GameButton from "./components/GameButton";
import Confetti from 'react-confetti';

function App(): React.JSX.Element {
  const [die, setDie] = useState<Die[]>(generateNewDice);
  const winConditionVal: boolean = winCondition(die)

  return (
    <div className="font-inter">
    {winConditionVal && (
      <div className="fixed top-0 left-0 w-full h-full z-10 pointer-events-none">
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      </div>
    )}
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-white text-center flex flex-col items-center justify-center px-4 py-10 font-sans text-gray-800">
      <div className="w-full max-w-md mb-4">
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
        <GameButton setDie={setDie} winConditionVal={winConditionVal}/>   
      </div>
    </div>
    </div>
  )
}

export default App