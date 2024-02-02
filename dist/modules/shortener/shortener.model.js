"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Shortener = void 0;
const mongoose_1 = require("mongoose");
const uuid_1 = require("uuid");
function generateShortUuid() {
    const fullUuid = (0, uuid_1.v4)();
    return fullUuid.substring(0, 8); // Use only the first 6 characters
}
const demoSchema = new mongoose_1.Schema({
    fullUrl: {
        type: String,
        required: true,
    },
    shortUrl: {
        type: String,
        required: true,
        default: generateShortUuid,
    },
    clicks: {
        type: Number,
        required: true,
        default: 0,
    },
});
exports.Shortener = (0, mongoose_1.model)('Shortener', demoSchema);
