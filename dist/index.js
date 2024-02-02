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
exports.io = void 0;
/* eslint-disable no-console */
const app_1 = __importDefault(require("./app/app"));
const config_1 = require("./config");
const dbConnect_1 = require("./db/dbConnect");
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const server = http_1.default.createServer(app_1.default);
exports.io = new socket_io_1.Server(server, {
    cors: {
        origin: '*',
    },
});
exports.io.on('connection', socket => {
    console.log('A user connected');
    socket.on('joinRoom', userId => {
        socket.join(userId);
        console.log(`User ${userId} joined the room`);
    });
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (config_1.mongoUrl) {
            yield (0, dbConnect_1.connectMongoDB)(config_1.mongoUrl);
            server.listen(config_1.port, () => {
                console.log(`server is running at ${config_1.port}`);
            });
        }
        else {
            console.error('MongoDB URL is not defined.');
        }
    }
    catch (error) {
        console.error('Failed to connect to the database:', error);
    }
}))();
