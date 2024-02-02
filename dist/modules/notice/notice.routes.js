"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noticeRoutes = void 0;
const express_1 = require("express");
const notice_controller_1 = require("./notice.controller");
exports.noticeRoutes = (0, express_1.Router)();
exports.noticeRoutes
    .route('/')
    .get(notice_controller_1.getAllNoticeController)
    .post(notice_controller_1.createNoticeController);
exports.noticeRoutes.route('/:id').delete(notice_controller_1.deleteNoticeController);
