import mongoose, {Schema, Document} from 'mongoose';

export interface IUser extends Document { 
  type: typeof Schema.Types.ObjectId, 
  ref: string, 
  required: boolean 
}

export interface IGameSession extends Document {
  rolls: number
  duration: number
  won: boolean
  date: Date
  user: IUser
}

const gameSessionSchema = new Schema<IGameSession>({
  rolls: {type: Number, required: true},
  duration: {type: Number, required: true},
  won: {type: Boolean, required: true},
  date: {type: Date, required: true},
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
})

export default mongoose.model<IGameSession>('GameSession', gameSessionSchema)