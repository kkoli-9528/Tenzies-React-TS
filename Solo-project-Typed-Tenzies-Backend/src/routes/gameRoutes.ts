import { Router, Response, Request } from 'express';
import GameSession from '../models/GameSession';
import { GameSessionInput } from '../types/game'

const router: Router = Router()

router.post('/', async (req: Request<{}, {}, GameSessionInput>, res: Response) => {
  try {
    const {rolls, duration, won, date} = req.body

    if([rolls, duration, won, date].some((v) => v === undefined)) return res.status(400).json({error: "Invalid game data"})

    const game = new GameSession({rolls, duration, won, date})
    const saved = await game.save()

    return res.status(200).json(saved)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: "Server error" })
  }
})

export default router