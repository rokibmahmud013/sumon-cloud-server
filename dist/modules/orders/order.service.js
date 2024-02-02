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
exports.getAllOrderService = exports.approvalOrderService = exports.createOrderService = void 0;
const subscription_service_1 = require("../subscription/subscription.service");
const user_model_1 = require("../user/user.model");
const order_model_1 = require("./order.model");
const createOrderService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield user_model_1.User.findOneAndUpdate({ _id: data.userId }, { $set: { 'Order.status': 'pending' } }, { new: true });
        const result = yield order_model_1.Order.create(data);
        return result;
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.createOrderService = createOrderService;
const approvalOrderService = (queries) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const endDate = new Date();
        endDate.setDate(endDate.getDate() + 30);
        const result = yield order_model_1.Order.findOneAndUpdate({ _id: queries.id }, { $set: { status: 'approved' } });
        const subScriptionData = {
            status: 'approved',
            site: result === null || result === void 0 ? void 0 : result.site,
            category: result === null || result === void 0 ? void 0 : result.category,
            endDate: endDate,
            user: result === null || result === void 0 ? void 0 : result.userId
        };
        yield user_model_1.User.findOneAndUpdate({ _id: result === null || result === void 0 ? void 0 : result.userId }, { $set: { userType: 'paid' } });
        yield (0, subscription_service_1.updateSubscriptionService)(subScriptionData);
        return result;
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.approvalOrderService = approvalOrderService;
const getAllOrderService = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield order_model_1.Order.find({}).populate('userId', 'email name');
        return result;
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.getAllOrderService = getAllOrderService;
