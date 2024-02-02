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
exports.getAllShortLinkService = exports.createShortLinkService = void 0;
const shortener_model_1 = require("./shortener.model");
const createShortLinkService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = shortener_model_1.Shortener.create(data);
        return result;
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.createShortLinkService = createShortLinkService;
const getAllShortLinkService = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield shortener_model_1.Shortener.find({}).sort({ updatedAt: -1 });
        return result;
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.getAllShortLinkService = getAllShortLinkService;
