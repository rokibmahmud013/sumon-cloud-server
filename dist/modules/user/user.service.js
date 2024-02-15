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
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailVerificationService = exports.updateUserByIdService = exports.getAllUserService = exports.findUserByEmail = exports.createUserService = void 0;
const subscription_service_1 = require("../subscription/subscription.service");
const user_model_1 = require("./user.model");
const createUserService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_model_1.User.create(data);
        return result;
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.createUserService = createUserService;
const findUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield user_model_1.User.findOne({ email });
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.findUserByEmail = findUserByEmail;
const getAllUserService = (status) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = {
            role: { $ne: 'admin' },
            isActive: { $ne: false },
        };
        if (status && status !== 'all') {
            query.userType = status;
        }
        return yield user_model_1.User.find(query).select('-Password').sort({ updatedAt: -1 });
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.getAllUserService = getAllUserService;
const updateUserByIdService = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findByIdAndUpdate(id.toString(), data);
    return result;
});
exports.updateUserByIdService = updateUserByIdService;
const emailVerificationService = (id, token) => __awaiter(void 0, void 0, void 0, function* () {
    let message;
    const result = yield user_model_1.User.findById(id);
    if ((result === null || result === void 0 ? void 0 : result.token) == token) {
        const subScriptionData = {
            user: result._id,
            subscriptions: [
                {
                    status: 'trial',
                    site: 'Mega',
                    category: ['login'],
                    startDate: new Date(),
                    endDate: new Date(+new Date() + 3 * 24 * 60 * 60 * 1000),
                },
                {
                    status: 'trial',
                    site: 'Skip',
                    category: ['login'],
                    startDate: new Date(),
                    endDate: new Date(+new Date() + 3 * 24 * 60 * 60 * 1000),
                },
                {
                    status: 'trial',
                    site: 'eros',
                    category: ['login'],
                    startDate: new Date(),
                    endDate: new Date(+new Date() + 3 * 24 * 60 * 60 * 1000),
                },
                {
                    status: 'trial',
                    site: 'tryst',
                    category: ['login'],
                    startDate: new Date(),
                    endDate: new Date(+new Date() + 3 * 24 * 60 * 60 * 1000),
                },
                {
                    status: 'trial',
                    site: 'PD',
                    category: ['login'],
                    startDate: new Date(),
                    endDate: new Date(+new Date() + 3 * 24 * 60 * 60 * 1000),
                },
            ],
        };
        yield (0, subscription_service_1.createSubscriptionService)(subScriptionData);
        yield user_model_1.User.findByIdAndUpdate({ _id: result._id }, {
            $set: {
                isActive: true,
            },
        }, { new: true });
        // Create A new Trial SubScription
        message = 'Account Verification Successfully';
    }
    else {
        throw new Error('Email Varification Link Expired');
    }
    return { message, result };
});
exports.emailVerificationService = emailVerificationService;
