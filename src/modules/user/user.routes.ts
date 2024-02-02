import { Router } from 'express';
import {
  changeEmailAndVerify,
  createUserController,
  getAllUserController,
  getMe,
  loginUserController,
  logoutController,
  resendEmailController,
  verifyEmailController,
} from './user.controller';
import { verifyToken } from '../../middlewares/verifyToken';

export const authRoutes = Router();

authRoutes.route('/signup').post(createUserController);
authRoutes.route('/login').post(loginUserController);
authRoutes.route('/me').get(verifyToken, getMe);
authRoutes.route('/logout').get(logoutController);
authRoutes.route('/users').get(getAllUserController);
authRoutes.route('/resend_mail').get(resendEmailController);
authRoutes.route('/change_mail_and_verify').patch(changeEmailAndVerify);
authRoutes.route('/verify/:id/:token').get(verifyEmailController);
// authRoutes.route('/user/:id')
// .patch(updateUserByIdController)
