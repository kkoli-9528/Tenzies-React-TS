import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true, unique: true },
}, { timestamps: true });

export default mongoose.model<IUser>('User', userSchema);