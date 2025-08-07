import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET_KEY = process.env.JWT_SECRET
console.log(JWT_SECRET_KEY)
if(!JWT_SECRET_KEY) throw new Error('JWT_SECRET_KEY not set')

export const signToken = (userId: string): string => {
  return jwt.sign({userId}, JWT_SECRET_KEY, {expiresIn: '7d'})
}

export const verifyToken = (token: string): string | null => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET_KEY) as {userId: string}
    return decoded.userId
  } catch (error) {
    return null
  }
}
