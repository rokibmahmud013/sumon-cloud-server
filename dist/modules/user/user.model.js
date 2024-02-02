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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const validator_1 = __importDefault(require("validator"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const uuid_1 = require("uuid");
const userSchema = new mongoose_1.Schema({
    id: {
        type: String,
        default: () => (0, uuid_1.v4)().substring(0, 6),
        unique: true,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    avatar: String,
    email: {
        type: String,
        validate: [validator_1.default.isEmail, 'Provide a valid Email'],
        trim: true,
        lowercase: true,
        unique: true,
        required: [true, 'Email address is required'],
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    isActive: {
        type: Boolean,
        default: false,
    },
    userType: {
        type: String,
        default: 'trial',
    },
    token: String,
}, { timestamps: true });
userSchema.methods.comparePassword = function (password) {
    return bcryptjs_1.default.compareSync(password, this.password);
};
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const hashedPassword = bcryptjs_1.default.hashSync(this.password);
            this.password = hashedPassword;
            next();
        }
        catch (error) {
            next(error);
        }
    });
});
exports.User = (0, mongoose_1.model)('User', userSchema);
