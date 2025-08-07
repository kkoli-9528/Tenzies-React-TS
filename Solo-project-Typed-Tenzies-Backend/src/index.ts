import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/connectDB';
import gameRoutes from './routes/gameRoutes';
import authRoutes from './routes/authRoutes';
import { authMiddleware } from './middleware/authMiddleware'
import cors from 'cors';

dotenv.config()
const app: Application = express()
app.use(express.json())
app.use(cors())

app.get('/', (_: Request, res: Response) => res.send('API Running'))

const PORT: number = parseInt(process.env.PORT || '5000', 10)

connectDB()

app.use('/api/auth', authRoutes)
app.use('/api/games', authMiddleware, gameRoutes)

app.listen(PORT, () => console.log(`Server on port ${PORT}`))