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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllNoticeService = exports.deleteNoticeService = exports.createNoticeService = void 0;
const notice_model_1 = require("./notice.model");
const createNoticeService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = notice_model_1.Notice.create(data);
        return result;
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.createNoticeService = createNoticeService;
const deleteNoticeService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = notice_model_1.Notice.findByIdAndDelete(id);
        return result;
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.deleteNoticeService = deleteNoticeService;
const getAllNoticeService = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = notice_model_1.Notice.find({}).sort({ updatedAt: -1 });
        return result;
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.getAllNoticeService = getAllNoticeService;
