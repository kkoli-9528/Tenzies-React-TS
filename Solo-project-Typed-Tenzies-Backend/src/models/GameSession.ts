import mongoose, {Schema, Document} from 'mongoose';

export interface IGameSession extends Document {
  rolls: number
  duration: number
  won: boolean
  date: Date
}

const gameSessionSchema = new Schema<IGameSession>({
  rolls: {type: Number, required: true},
  duration: {type: Number, required: true},
  won: {type: Boolean, required: true},
  date: {type: Date, required: true},
})

export default mongoose.model<IGameSession>('GameSession', gameSessionSchema)