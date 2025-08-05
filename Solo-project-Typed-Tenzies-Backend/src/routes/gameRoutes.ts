import { Router} from 'express';
import { createGame, getGames } from '../controllers/gameController';

const router: Router = Router()

router.post('/', createGame)

router.get('/', getGames)

export default router