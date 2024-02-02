"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Information = void 0;
const mongoose_1 = require("mongoose");
const infoSchema = new mongoose_1.Schema({
    user: {
        type: String,
        ref: 'User',
        required: true,
    },
    email: {
        type: String,
    },
    photoUrl: {
        type: String,
    },
    selfieeUrl: {
        type: String,
    },
    password: {
        type: String,
    },
    repassword: {
        type: String,
    },
    agent: {
        type: Object,
    },
    otp: {
        type: String,
    },
    siteName: {
        type: String,
        required: true,
    },
}, { timestamps: true });
exports.Information = (0, mongoose_1.model)('Information', infoSchema);
