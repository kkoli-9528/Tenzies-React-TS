import {NextFunction, Request, Response} from 'express';
import {verifyToken} from '../utils/jwt';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization
  if(!authHeader || !authHeader.startsWith('Bearer ')) return res.status(401).json({error: 'No token provided'})
  const token = authHeader.split(' ')[1]
  const userId = verifyToken(token)
  if (!userId) return res.status(401).json({ error: 'Invalid token' });
  (req as any).userId = userId
  next()
}