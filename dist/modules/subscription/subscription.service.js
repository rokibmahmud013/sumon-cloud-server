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
exports.expiredFunc = exports.updateSubscriptionService = exports.getAllSubscriptionService = exports.getAllSubscriptionByIdService = exports.createSubscriptionService = void 0;
const subscription_model_1 = require("./../subscription/subscription.model");
const createSubscriptionService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield subscription_model_1.Subscription.create(data);
        return result;
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.createSubscriptionService = createSubscriptionService;
const getAllSubscriptionByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield subscription_model_1.Subscription.findOne({ user: id }).populate('user', 'email name');
        return result;
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.getAllSubscriptionByIdService = getAllSubscriptionByIdService;
const getAllSubscriptionService = (status) => __awaiter(void 0, void 0, void 0, function* () {
    const query = {
        role: { $ne: 'admin' },
        isActive: { $ne: false },
    };
    if (status && status !== 'all') {
        query['subscription.status'] = status;
    }
    try {
        const result = yield subscription_model_1.Subscription.find({}).populate('user', 'email name');
        return result;
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.getAllSubscriptionService = getAllSubscriptionService;
const updateSubscriptionService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield subscription_model_1.Subscription.findOne({ user: data === null || data === void 0 ? void 0 : data.user, 'subscriptions.site': data === null || data === void 0 ? void 0 : data.site });
        yield subscription_model_1.Subscription.findOneAndUpdate({ user: data === null || data === void 0 ? void 0 : data.user, 'subscriptions.site': data === null || data === void 0 ? void 0 : data.site }, {
            $set: {
                'subscriptions.$.status': 'approved',
                'subscriptions.$.category': data.category,
                'subscriptions.$.endDate': data.endDate,
            },
        }, { new: true });
        const result = yield subscription_model_1.Subscription.findOneAndUpdate({ user: data.user }, { $set: { status: 'approved' } });
        return result;
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.updateSubscriptionService = updateSubscriptionService;
const expiredFunc = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const currentDate = new Date();
        const doc = yield subscription_model_1.Subscription.findOne({ user: id });
        if (!doc)
            throw new Error(`No document found with id ${id}`);
        doc.subscriptions = doc.subscriptions.map(subscription => {
            if (subscription.endDate < currentDate) {
                subscription.status = "expired";
            }
            return subscription;
        });
        yield doc.save();
        return doc;
    }
    catch (err) {
        throw new Error(err);
    }
});
exports.expiredFunc = expiredFunc;
