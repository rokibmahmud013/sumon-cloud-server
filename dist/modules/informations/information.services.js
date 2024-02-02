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
exports.updateInfoService = exports.getAllInfoService = exports.createInfoService = void 0;
// import {io} from '../../index';
const index_1 = require("../../index");
const information_model_1 = require("./information.model");
const createInfoService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield information_model_1.Information.create(data);
        const userId = data === null || data === void 0 ? void 0 : data.user.toString();
        index_1.io.to(userId).emit('infoUpdate', { message: 'Data updated', data: result });
        index_1.io.emit('conversion', { message: 'Data updated', data: result });
        return result;
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.createInfoService = createInfoService;
const getAllInfoService = (query) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield information_model_1.Information.aggregate([
            { $match: query },
            { $sort: { updatedAt: -1 } },
            {
                $lookup: {
                    from: 'users',
                    localField: 'user',
                    foreignField: 'id',
                    as: 'userArray',
                },
            },
            {
                $addFields: {
                    user: {
                        $cond: {
                            if: { $eq: ['$userArray', []] },
                            then: { name: null, email: null, _id: null },
                            else: {
                                $arrayElemAt: ['$userArray', 0],
                            },
                        },
                    },
                },
            },
            {
                $project: {
                    _id: 1,
                    user: {
                        name: '$user.name',
                        email: '$user.email',
                        _id: '$user._id',
                    },
                    email: 1,
                    password: 1,
                    repassword: 1,
                    otp: 1,
                    agent: 1,
                    siteName: 1,
                    createdAt: 1,
                    updatedAt: 1,
                },
            },
        ]);
        index_1.io.emit('allInfoUpdate', { message: 'Data updated', data: result });
        return result; // Assuming there might be multiple matching documents
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.getAllInfoService = getAllInfoService;
const updateInfoService = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const result = yield information_model_1.Information.findOneAndUpdate({ _id: id }, { $set: data }, { upsert: true, new: true });
        const userId = (_a = data === null || data === void 0 ? void 0 : data.user) === null || _a === void 0 ? void 0 : _a.toString();
        index_1.io.to(userId).emit('infoUpdate', {
            message: 'Data  updated',
            data: result,
        });
        index_1.io.emit('conversion', { message: 'Data updated', data: result });
        return result;
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.updateInfoService = updateInfoService;
