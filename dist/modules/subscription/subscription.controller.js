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
exports.createSubscriptionController = exports.getAllSubscriptionController = exports.getSubscriptionByIdController = void 0;
const subscription_service_1 = require("./subscription.service");
const getSubscriptionByIdController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const data = yield (0, subscription_service_1.getAllSubscriptionByIdService)(id);
        res.status(200).json({
            status: 200,
            success: true,
            message: 'success',
            data: data,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getSubscriptionByIdController = getSubscriptionByIdController;
const getAllSubscriptionController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { status } = req.query;
    try {
        const data = yield (0, subscription_service_1.getAllSubscriptionService)(status);
        res.status(200).json({
            status: 200,
            success: true,
            message: 'success',
            data: data,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getAllSubscriptionController = getAllSubscriptionController;
const createSubscriptionController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, subscription_service_1.createSubscriptionService)(req.body);
        res.status(201).json({
            status: 201,
            success: true,
            message: 'subscription updated successfully',
            data: data,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.createSubscriptionController = createSubscriptionController;
