"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_routes_1 = __importDefault(require("./endpoints/user.routes"));
const apiRouter = (0, express_1.Router)();
apiRouter.use('/users', user_routes_1.default);
exports.default = apiRouter;
//# sourceMappingURL=api.routes.js.map