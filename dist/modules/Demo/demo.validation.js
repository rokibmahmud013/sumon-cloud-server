"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DemoValidationSchema = void 0;
const zod_1 = require("zod");
exports.DemoValidationSchema = zod_1.z.object({
    id: zod_1.z.string(),
    name: zod_1.z.string(),
    avatar: zod_1.z.string(),
});
