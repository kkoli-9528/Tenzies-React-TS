import type { Dispatch, RefObject, SetStateAction } from "react";
import type { Die } from "../types/types";
import {generateNewDice, rollDie} from '../utils/index';

const GameButton = ({setDie, winConditionVal, setRolls, startTimeRef, loading}: {setDie: Dispatch<SetStateAction<Die[]>>, winConditionVal: boolean, setRolls: Dispatch<SetStateAction<number>>, startTimeRef: RefObject<number>, loading: boolean}): React.JSX.Element => {
  return (
  <>
    {(!winConditionVal) &&
      (<button
      className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md transition-colors duration-150 text-lg font-medium cursor-pointer"
      onClick={(): void => {
        setDie((prev: Die[]): Die[] => rollDie(prev))
        setRolls((prev: number) => prev + 1)
      }}>
      Roll
    </button>)
    }
    {(loading) &&
      (<button
      className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md transition-colors duration-150 text-lg font-medium cursor-pointer">
      Loading<span>.</span><span>.</span><span>.</span>
    </button>)
    }
    {(winConditionVal && !loading) &&
    (<button
      className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md transition-colors duration-150 text-lg font-medium cursor-pointer"
      onClick={(): void => {
        setDie((): Die[] => generateNewDice())
        setRolls(0)
        startTimeRef.current = Date.now()
      }}>
      Play Agin
    </button>)
    }
  </>
  )
}

export default GameButton