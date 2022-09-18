"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("./loaders/express"));
const config_1 = __importDefault(require("./config"));
express_1.default.listen(config_1.default.server_port, () => {
    console.log(`The application is listening on port ${config_1.default.server_port}!`);
});
//# sourceMappingURL=server.js.map