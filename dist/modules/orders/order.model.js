"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const mongoose_1 = require("mongoose");
const ordersSchema = new mongoose_1.Schema({
    // paymentMethod: {
    //   type: String,
    //   required: true,
    // },
    // amount: {
    //   type: Number,
    //   required: true,
    // },
    site: {
        type: String,
        required: true,
    },
    category: {
        type: [String],
        required: true,
    },
    // paymentNumber: {
    //   type: String,
    //   required: true,
    // },
    // trxId: {
    //   type: String,
    //   required: true,
    // },
    status: {
        type: String,
        enum: ['pending', 'approved'],
        default: 'pending',
    },
    userId: {
        type: mongoose_1.Types.ObjectId,
        required: true,
        ref: 'User',
    },
}, { timestamps: true });
exports.Order = (0, mongoose_1.model)('Order', ordersSchema);
