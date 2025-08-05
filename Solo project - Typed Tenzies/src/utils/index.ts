// util functions over here

import type { Dispatch, SetStateAction } from "react"
import type { Die } from "../types/types"
import { toast } from 'react-toastify';

export const generateNewDice: () => Die[] = () => {
  return Array.from({length: 10}, (_, i): Die => ({
      id: i + 1,
      value: Math.ceil(Math.random() * 6), 
      isHeld: false
    })
  )
}

export const idHandler: (id: number, setDie: Dispatch<SetStateAction<Die[]>>) => void = (id, setDie) => {
    setDie((die: Die[]): Die[] => 
      die.map((item: Die): Die => 
        item.id === id ? {...item, isHeld: !item.isHeld} : item
    )
  )
}

export const rollDie: (prev: Die[]) => Die[] = (prev) => {
  return prev.map(item => 
    !item.isHeld ? {...item, value: Math.ceil(Math.random() * 6)} : item
  )
}

export const winCondition: (die: Die[]) => boolean = (die) => {
  const firstHeld: Die | undefined = die.find(d => d.isHeld)
  if(!firstHeld) return false
  return die.every(item => item.isHeld === true && item.value === firstHeld.value)
}

export const showErrorToast: (message: string) => void = (message = "Something went wrong") => {
  toast.error(message, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false
  })
}