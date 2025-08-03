// types over here

export interface Die {
  id: number
  value: number
  isHeld: boolean
}

export interface gameSession {
  rolls: number
  duration: number
  won: boolean
  date: Date
}