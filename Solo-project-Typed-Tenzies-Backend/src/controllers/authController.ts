import { Request, Response } from 'express';
import User from '../models/User';
import { signToken } from '../utils/jwt';

export const register = async (req: Request, res: Response) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: 'Name is required' });
  try {
    const existing = await User.findOne({ name });
    if (existing) return res.status(400).json({ error: 'Name already taken' });
    const user = await new User({ name }).save();
    const token = signToken(String(user._id));
    return res.status(201).json({ user, token });
  } catch (err) {
    return res.status(500).json({ error: 'Server error' });
  }
};

export const login = async (req: Request, res: Response) => {
 const { name } = req.body
 if(!name) return res.status(400).json({error: 'Name is required'})
  try {
    const user = await User.findOne({name})
    if(!user) return res.status(400).json({error: 'User not found'})
    const token = signToken(String(user._id))
    return res.status(200).json({user, token})
  } catch (error) {
    return res.status(500).json({error: 'Server error'})
  }
}