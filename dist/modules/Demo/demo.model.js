"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Demo = void 0;
const mongoose_1 = require("mongoose");
const demoSchema = new mongoose_1.Schema({
    id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
    },
});
exports.Demo = (0, mongoose_1.model)('Demo', demoSchema);
