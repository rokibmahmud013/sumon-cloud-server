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
exports.sendMail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const ejs_1 = __importDefault(require("ejs"));
const path_1 = __importDefault(require("path"));
const sendMail = (email, subject, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const html = yield ejs_1.default.renderFile(path_1.default.join(__dirname, '..', 'views', 'email.ejs'), { data: data });
        const transporter = nodemailer_1.default.createTransport({
            host: process.env.HOST,
            service: process.env.SERVICE,
            // port: 587,
            port: 465,
            secure: true,
            auth: {
                user: process.env.USER,
                pass: process.env.PASS,
            },
        });
        yield transporter.sendMail({
            from: process.env.USER,
            to: email,
            subject: subject,
            html: html,
        });
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.sendMail = sendMail;
