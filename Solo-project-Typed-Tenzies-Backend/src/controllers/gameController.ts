import { Request, Response } from 'express'
import GameSession from '../models/GameSession'
import { GameSessionInput } from '../types/game'
import {gameSessionSchema} from '../validators/gameValidator';

export const createGame = async (req: Request<{}, {}, GameSessionInput>, res: Response) => {
  try {
    const result = gameSessionSchema.safeParse(req.body)
    if(!result.success) return res.status(400).json({ error: result.error })
    const { rolls, duration, won, date } = result.data

    const saved = await new GameSession({ rolls, duration, won, date }).save()
    return res.status(200).json(saved)
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Server error' })
  }
}

export const getGames = async (_: Request, res: Response) => {
  try {
    const sessions = await GameSession.find().sort({ date: -1 })
    return res.status(200).json(sessions)
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Failed to fetch sessions' })
  }
}
