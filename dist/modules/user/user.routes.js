"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const verifyToken_1 = require("../../middlewares/verifyToken");
exports.authRoutes = (0, express_1.Router)();
exports.authRoutes.route('/signup').post(user_controller_1.createUserController);
exports.authRoutes.route('/login').post(user_controller_1.loginUserController);
exports.authRoutes.route('/me').get(verifyToken_1.verifyToken, user_controller_1.getMe);
exports.authRoutes.route('/logout').get(user_controller_1.logoutController);
exports.authRoutes.route('/users').get(user_controller_1.getAllUserController);
exports.authRoutes.route('/resend_mail').get(user_controller_1.resendEmailController);
exports.authRoutes.route('/change_mail_and_verify').patch(user_controller_1.changeEmailAndVerify);
exports.authRoutes.route('/verify/:id/:token').get(user_controller_1.verifyEmailController);
// authRoutes.route('/user/:id')
// .patch(updateUserByIdController)
