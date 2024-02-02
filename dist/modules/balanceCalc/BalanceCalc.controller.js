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
exports.getAdminBalanceController = void 0;
const subscription_model_1 = require("../subscription/subscription.model");
const getAdminBalanceController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const now = new Date();
        const currentMonth = now.getMonth() + 1;
        const currentYear = now.getFullYear();
        const currentMonthName = now.toLocaleString('default', { month: 'long' });
        const subscription = yield subscription_model_1.Subscription.aggregate([
            {
                $match: {
                    updatedAt: {
                        $gte: new Date(currentYear, currentMonth - 1, 1),
                        $lt: new Date(currentYear, currentMonth, 1)
                    },
                    "subscriptions.status": "approved",
                }
            }
        ]);
        // const totalSubscription =  subscription.subscriptions.map((sub:any) => 
        const totalLength = subscription.reduce((total, sub) => {
            return total + sub.subscriptions.length;
        }, 0);
        res.status(200).json({
            status: 200,
            success: true,
            message: 'success',
            totalSell: totalLength,
            adminAmount: totalLength * 500,
            totalUser: subscription.length,
            monthName: currentMonthName
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getAdminBalanceController = getAdminBalanceController;
