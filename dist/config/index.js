"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.token_secret = exports.port = exports.mongoUrl = void 0;
require("dotenv/config");
exports.mongoUrl = process.env.mongoDB_URI;
exports.port = process.env.PORT;
exports.token_secret = process.env.TOKEN_SECRET;
