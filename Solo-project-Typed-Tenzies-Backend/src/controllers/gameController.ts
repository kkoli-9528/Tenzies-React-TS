import { Request, Response } from 'express'
import GameSession from '../models/GameSession'
import { GameSessionInput } from '../types/game'
import {gameSessionSchema} from '../validators/gameValidator';

type RequestWithUser = Request & { userId?: string };

export const createGame = async (req: RequestWithUser, res: Response) => {
  const { rolls, duration, won, date } = req.body
  const userId = req.userId
  if (!userId) return res.status(401).json({ error: 'Unauthorized' });
  if([rolls, duration, won, date].some(v => v === undefined)){
    return res.status(400).json({ error: 'Invalid game data '})
  }
  try {
    const game = await new GameSession({ rolls, duration, won, date, user: userId }).save()
    return res.status(200).json(game)
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Server error' })
  }
}

export const getGames = async (req: RequestWithUser, res: Response) => {
  const userId = req.userId
  if (!userId) return res.status(401).json({ error: 'Unauthorized' });
  try {
    const sessions = await GameSession.find().sort({ date: -1 })
    return res.status(200).json(sessions)
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Failed to fetch sessions' })
  }
}
