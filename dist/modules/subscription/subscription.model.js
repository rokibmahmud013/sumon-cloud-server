"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Subscription = void 0;
const mongoose_1 = require("mongoose");
const subSchema = new mongoose_1.Schema({
    status: {
        type: String,
        enum: ['pending', 'approved', 'expired', 'trial'],
        default: 'pending',
    },
    site: {
        type: String,
        required: true,
    },
    category: {
        type: [String],
        required: true,
    },
    startDate: {
        type: Date,
        default: new Date(),
    },
    endDate: {
        type: Date,
        default: new Date(),
    }
}, {
    timestamps: true
});
const subscriptionSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    subscriptions: [subSchema]
}, { timestamps: true });
subscriptionSchema.set('toObject', { virtuals: true });
subscriptionSchema.set('toJSON', { virtuals: true });
exports.Subscription = (0, mongoose_1.model)('Subscription', subscriptionSchema);
