import { type Dispatch, type SetStateAction } from "react";
import type { Die } from "../types/types";
import { idHandler } from '../utils/index';

const DieComponent = ({die, setDie}: {die: Die[], setDie: Dispatch<SetStateAction<Die[]>>}): React.JSX.Element => {

  return (
    <div className="grid grid-cols-5 gap-4 p-4 bg-white rounded-lg shadow-md">
        {die.map((item: Die): React.JSX.Element => (
        <div 
        key={item.id}
        aria-selected={item.isHeld}
        className={`w-14 h-14 flex items-center justify-center rounded-lg border-2 cursor-pointer text-xl font-semibold transition-colors ${item.isHeld ? "bg-yellow-300 border-yellow-400" : "bg-white border-gray-300"}`}
        onClick={(): void => {
          idHandler(item.id, setDie)
        }}>
          {item.value}
        </div>
      ))}
    </div>
  )
}

export default DieComponent