"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.agentMiddleware = void 0;
const express_useragent_1 = __importDefault(require("express-useragent"));
const agentMiddleware = (req, res, next) => {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const userAgentString = req.headers['user-agent'] || '';
    const userAgentData = express_useragent_1.default.parse(userAgentString);
    req.agent = {
        ip,
        browser: userAgentData.browser,
        version: userAgentData.version,
        os: userAgentData.os,
        platform: userAgentData.platform,
        source: userAgentData.source,
    };
    next();
};
exports.agentMiddleware = agentMiddleware;
