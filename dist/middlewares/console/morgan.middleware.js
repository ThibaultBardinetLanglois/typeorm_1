"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const morgan_1 = __importDefault(require("morgan"));
const cli_color_1 = __importDefault(require("cli-color"));
const utils_1 = __importDefault(require("../../utils/utils"));
exports.default = (0, morgan_1.default)(function (tokens, req, res) {
    const getStatusColor = (status) => {
        if (status >= 500) {
            return cli_color_1.default.red(status);
        }
        else if (status >= 400) {
            return cli_color_1.default.yellow(status);
        }
        else if (status >= 300) {
            return cli_color_1.default.cyan(status);
        }
        else if (status >= 200) {
            return cli_color_1.default.green(status);
        }
        return status;
    };
    return [
        cli_color_1.default.magenta('\n-------------------------------\n Morgan response description :\n-------------------------------'),
        cli_color_1.default.cyan('\nStatus code :'),
        getStatusColor(Number(tokens.status(req, res))),
        cli_color_1.default.cyan('\nContent length :'),
        tokens.res(req, res, 'content-length'),
        cli_color_1.default.cyan('\nResponse time'),
        tokens['response-time'](req, res), 'ms',
        cli_color_1.default.cyan('\nDate :'),
        (0, utils_1.default)(tokens.date(req, res)),
    ].join(' ');
});
//# sourceMappingURL=morgan.middleware.js.map