"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebLink = void 0;
const mongoose_1 = require("mongoose");
const siteSchema = new mongoose_1.Schema({
    siteUrl: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    sites: {
        type: String,
        required: true,
    },
}, { timestamps: true });
exports.WebLink = (0, mongoose_1.model)('WebLink', siteSchema);
