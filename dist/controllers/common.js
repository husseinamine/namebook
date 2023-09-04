"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processErrors = exports.send = void 0;
function send(res, options) {
    res.status(options.status);
    return res.json({
        "status": options.status,
        "message": options.message
    });
}
exports.send = send;
function processErrors(res, e, schema) {
    for (let field in schema) {
        for (let key in schema[field]) {
            let value = schema[field][key];
            if (typeof value === "object" && value.length === 2) {
                if (e.message.indexOf(value[1]) !== -1) {
                    return send(res, {
                        status: 400,
                        message: value[1]
                    });
                }
            }
        }
    }
    console.log(e);
    return send(res, {
        status: 500,
        message: "unexpected server error."
    });
}
exports.processErrors = processErrors;
