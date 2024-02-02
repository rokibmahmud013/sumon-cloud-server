"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noticeValidationSchema = void 0;
const zod_1 = require("zod");
exports.noticeValidationSchema = zod_1.z.object({
    id: zod_1.z.string(),
    name: zod_1.z.string(),
    avatar: zod_1.z.string(),
});
