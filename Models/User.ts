import mongoose, { Schema, Document } from "mongoose";

interface IUser extends Document {
  email: String;
  password: string;
  firstName: string;
  lastName: string;
  age: number;
  createdAt: Date;
}

const UserSchema = new Schema<IUser>({
  email: {
    type: String,
    unique: true,
    trim: true,
    required: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: false,
  },
  lastName: {
    type: String,
    required: false,
  },
  age: {
    type: Number,
    required: false,
  },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model<IUser>("User", UserSchema);

export { User, IUser };
