import jwt from 'jsonwebtoken';
import { token_secret } from '../config';

export const genarateToken = (userInfo: any) => {
  const payload = {
    email: userInfo.email,
    role: userInfo.role,
  };

  const token = jwt.sign(payload, token_secret, {
    expiresIn: '24hr',
  });
  return token;
};
