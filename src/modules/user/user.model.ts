import { Schema, model } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { IUser } from './user.interface';

const userSchema = new Schema<IUser>(
  {
    id: {
      type: String,
      default: () => uuidv4().substring(0, 6),
      unique: true,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    avatar: String,
    email: {
      type: String,
      validate: [validator.isEmail, 'Provide a valid Email'],
      trim: true,
      lowercase: true,
      unique: true,
      required: [true, 'Email address is required'],
    },
    gender: {
      type: String,
      enum: ['male', 'female'],
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    userType: {
      type: String,
      default: 'trial',
    },
    token: String,
  },
  { timestamps: true },
);

userSchema.methods.comparePassword = function (password: string) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.pre('save', async function (next) {
  try {
    const hashedPassword = bcrypt.hashSync(this.password);
    this.password = hashedPassword;

    next();
  } catch (error) {
    next(error as any);
  }
});

export const User = model<IUser>('User', userSchema);
