"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeEmailAndVerify = exports.resendEmailController = exports.verifyEmailController = exports.logoutController = exports.getAllUserController = exports.getMe = exports.loginUserController = exports.createUserController = void 0;
const user_validation_1 = require("./user.validation");
const user_service_1 = require("./user.service");
const token_1 = require("../../utils/token");
const verifyToken_1 = require("../../middlewares/verifyToken");
const user_model_1 = require("./user.model");
const emailSender_1 = require("../../utils/emailSender");
const subscription_service_1 = require("../subscription/subscription.service");
// const expiredSubScription = (date: Date): boolean => {
//   const currentDate = new Date();
//   return currentDate > date;
// };
const createUserController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // creating a schema validation using Zod
        const parseData = user_validation_1.UserValidationSchema.parse(req.body);
        const user = yield (0, user_service_1.createUserService)(parseData);
        const token = (0, token_1.genarateToken)(user);
        user.token = token;
        const data = yield user_model_1.User.findByIdAndUpdate({ _id: user._id }, {
            $set: {
                token: token,
            },
        }, { new: true });
        const message = `${process.env.BASE_URL}/auth/verify/${data === null || data === void 0 ? void 0 : data._id}/${token}`;
        yield (0, emailSender_1.sendMail)(user.email, 'Verify Email', message);
        return res.status(201).json({
            status: 201,
            success: true,
            message: 'Please Check your Email To Verify Your Account',
            data: data,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.createUserController = createUserController;
// for login controller
const loginUserController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(401).json({
                status: 'fail',
                message: 'Please provide your credentials',
            });
        }
        const user = yield (0, user_service_1.findUserByEmail)(email);
        if (!user) {
            return res.status(401).json({
                status: 'fail',
                error: 'No user found. Please create an account',
            });
        }
        const isPasswordValid = user.comparePassword(password, user === null || user === void 0 ? void 0 : user.password);
        if (!isPasswordValid) {
            return res.status(403).json({
                status: 'fail',
                message: 'Password is not correct',
            });
        }
        // if (!user.isActive) {
        //   return res.status(401).json({
        //     status: 'fail',
        //     error: 'Please Verify Your Account',
        //   });
        // }
        const prevToken = user === null || user === void 0 ? void 0 : user.token;
        if (prevToken) {
            (0, verifyToken_1.invalidateToken)(prevToken);
        }
        const token = (0, token_1.genarateToken)(user);
        user.token = token;
        yield user_model_1.User.findByIdAndUpdate(user._id, { token });
        // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
        const _a = user.toObject(), { password: pwd } = _a, others = __rest(_a, ["password"]);
        // make expired For All Plans And Progammes
        if (user.isActive) {
            yield (0, subscription_service_1.expiredFunc)(user === null || user === void 0 ? void 0 : user._id);
        }
        return res.status(200).json({
            status: 'success',
            message: 'Successfully logged in',
            data: {
                user: others,
                token,
            },
        });
    }
    catch (error) {
        next(error);
    }
});
exports.loginUserController = loginUserController;
const getMe = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const user = yield (0, user_service_1.findUserByEmail)((_b = req === null || req === void 0 ? void 0 : req.user) === null || _b === void 0 ? void 0 : _b.email);
        if (user.isActive) {
            yield (0, subscription_service_1.expiredFunc)(user === null || user === void 0 ? void 0 : user._id);
        }
        return res.status(200).json({
            status: 'success',
            data: user,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getMe = getMe;
const getAllUserController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { status } = req.query;
        const user = yield (0, user_service_1.getAllUserService)(status);
        return res.status(200).json({
            status: 'success',
            data: user,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getAllUserController = getAllUserController;
const logoutController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d, _e;
    try {
        const token = (_e = (_d = (_c = req === null || req === void 0 ? void 0 : req.headers) === null || _c === void 0 ? void 0 : _c.authorization) === null || _d === void 0 ? void 0 : _d.split(' ')) === null || _e === void 0 ? void 0 : _e[1];
        if (token) {
            (0, verifyToken_1.invalidateToken)(token);
        }
        res.status(200).json({
            status: 'success',
            message: 'Logged out successfully',
        });
    }
    catch (error) {
        next(error);
    }
});
exports.logoutController = logoutController;
const verifyEmailController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, token } = req.params;
        yield (0, user_service_1.emailVerificationService)(id, token);
        return res.render('success', {
            loginPath: `${process.env.FRONTEND_URL}/signin`,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.verifyEmailController = verifyEmailController;
const resendEmailController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.query;
        const user = yield user_model_1.User.findById(id);
        const message = `${process.env.BASE_URL}/auth/verify/${id}/${user.token}`;
        yield (0, emailSender_1.sendMail)(user.email, 'Verify Email', message);
        return res.status(201).json({
            status: 201,
            success: true,
            message: 'Please Check your Email To Verify Your Account',
        });
    }
    catch (error) {
        next(error);
    }
});
exports.resendEmailController = resendEmailController;
const changeEmailAndVerify = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.query;
        const user = yield user_model_1.User.findOneAndUpdate({ _id: id }, { $set: { email: req.body.email } }, { new: true });
        const message = `${process.env.BASE_URL}/auth/verify/${id}/${user.token}`;
        yield (0, emailSender_1.sendMail)(user.email, 'Verify Email', message);
        return res.status(201).json({
            status: 201,
            success: true,
            message: 'Please Check your Email To Verify Your Account',
        });
    }
    catch (error) {
        next(error);
    }
});
exports.changeEmailAndVerify = changeEmailAndVerify;
