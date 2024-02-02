import { Document } from 'mongoose';

export interface IUser extends Document {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  gender?: 'male' | 'female';
  role: 'user' | 'admin';
  password: string;
  isActive: boolean;
  userType: string;
  token: string;
  trialStarted: boolean;
  startFreeTrial(): void;
  renewSubscription(): void;
  getTotalTimeLeft(): number;
  getExpireOrNot(): void;
}
