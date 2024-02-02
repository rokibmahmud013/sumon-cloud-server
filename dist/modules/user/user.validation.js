"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidationSchema = void 0;
const zod_1 = require("zod");
exports.UserValidationSchema = zod_1.z.object({
    name: zod_1.z.string(),
    avatar: zod_1.z.string().optional(),
    email: zod_1.z.string().email('Invalid email format'),
    gender: zod_1.z
        .string()
        .optional()
        .refine(value => value === 'male' || value === 'female', {
        message: 'Gender must be either male or female',
    }),
    password: zod_1.z.string(),
    isActive: zod_1.z.boolean().optional(),
    role: zod_1.z
        .string()
        .optional()
        .refine(value => value === 'user' || value === 'admin', {
        message: 'Role must be either "user" or "admin"',
    })
        .default('user'),
});
