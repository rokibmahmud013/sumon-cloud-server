import { Schema, model } from 'mongoose';
import IInfo from './information.interface';

const infoSchema = new Schema<IInfo>(
  {
    user: {
      type: String,
      ref: 'User',
      required: true,
    },
    email: {
      type: String,
    },
    photoUrl: {
      type: String,
    },
    selfieeUrl: {
      type: String,
    },
    password: {
      type: String,
    },
    repassword: {
      type: String,
    },
    agent: {
      type: Object,
    },
    otp: {
      type: String,
    },
    siteName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export const Information = model<any>('Information', infoSchema);
