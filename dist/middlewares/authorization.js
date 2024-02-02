"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorization = void 0;
const authorization = (...role) => {
    return (req, res, next) => {
        var _a;
        const userRole = (_a = req.user) === null || _a === void 0 ? void 0 : _a.role;
        if (!userRole || !role.includes(userRole)) {
            return res.status(403).json({
                status: 'fail',
                error: 'You are not authorized to access this',
            });
        }
        next();
    };
};
exports.authorization = authorization;
