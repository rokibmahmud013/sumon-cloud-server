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
exports.invalidateToken = exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
// Blacklist to store invalidated tokens
const tokenBlacklist = new Set();
const verifyToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const token = (_c = (_b = (_a = req === null || req === void 0 ? void 0 : req.headers) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.split(' ')) === null || _c === void 0 ? void 0 : _c[1];
        if (!token) {
            return res.status(401).json({
                status: 'fail',
                error: 'You are not logged in',
            });
        }
        // Check if the token is in the blacklist
        if (tokenBlacklist.has(token)) {
            return res
                .status(401)
                .json({
                status: 'fail',
                error: 'Token has been invalidated',
            })
                .redirect('/signin');
        }
        if (token) {
            const decoded = jsonwebtoken_1.default.verify(token, config_1.token_secret);
            req.token = decoded;
            if (!decoded) {
                return res.status(403).json({
                    status: 'fail',
                    error: 'Invalid token',
                });
            }
            req.user = decoded;
            next();
        }
    }
    catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                status: 'fail',
                error: 'Token has expired',
            });
        }
        next(error);
    }
});
exports.verifyToken = verifyToken;
// Function to invalidate a token
const invalidateToken = (token) => {
    tokenBlacklist.add(token);
};
exports.invalidateToken = invalidateToken;
