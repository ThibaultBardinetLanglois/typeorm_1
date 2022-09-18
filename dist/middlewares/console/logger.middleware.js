"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cli_color_1 = __importDefault(require("cli-color"));
function loggerMiddleware(req, res, next) {
    const getVerbColor = (verb) => {
        if (verb === "GET" || verb === "POST") {
            return cli_color_1.default.green(verb);
        }
        else if (verb === "PUT" || "PATCH") {
            return cli_color_1.default.yellow(verb);
        }
        else if (verb === "DELETE") {
            return cli_color_1.default.cyan(verb);
        }
        return verb;
    };
    console.log(cli_color_1.default.magenta('\n-------------------------------\n Logger request description :\n-------------------------------'));
    console.log(cli_color_1.default.cyan('Referer :'), req.headers.referer);
    console.log(cli_color_1.default.cyan('Host :'), req.headers.host);
    console.log(cli_color_1.default.cyan('Hostname :'), req.hostname);
    console.log(cli_color_1.default.cyan('Headers content type :'), JSON.stringify(req.headers));
    console.log(cli_color_1.default.cyan('Remote address :'), JSON.stringify(req.socket.remoteAddress || req.headers['x-forwarded-for']));
    console.log(cli_color_1.default.cyan('Http version :'), req.httpVersion);
    console.log(cli_color_1.default.cyan('Method :'), getVerbColor(req.method));
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    console.log(cli_color_1.default.cyan('Url :'), getVerbColor(fullUrl));
    console.log(cli_color_1.default.cyan('Request params :'), req.params);
    console.log(cli_color_1.default.cyan("Request body", req.body));
    console.log(cli_color_1.default.cyan("User agent :", req.headers["user-agent"]));
    next();
}
exports.default = loggerMiddleware;
//# sourceMappingURL=logger.middleware.js.map