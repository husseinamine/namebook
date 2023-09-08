"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePassword = exports.processErrors = exports.send = void 0;
function send(res, options) {
    res.status(options.status);
    return res.json({
        "status": options.status,
        "message": options.message
    });
}
exports.send = send;
function processErrors(res, e, schema) {
    let errors = [];
    for (let field in schema) {
        for (let key in schema[field]) {
            let value = schema[field][key];
            if (key == "unique") {
                if (e.message.indexOf("E11000") !== -1) {
                    errors.push(value[1]);
                }
                continue;
            }
            if (typeof value === "object" && value.length === 2) {
                if (e.message.indexOf(value[1]) !== -1) {
                    errors.push(value[1]);
                }
            }
        }
    }
    if (errors.length > 0) {
        return send(res, {
            status: 400,
            message: errors
        });
    }
    console.log(e.message);
    return send(res, {
        status: 500,
        message: ["unexpected server error."]
    });
}
exports.processErrors = processErrors;
function validatePassword(res, userdata) {
    if (userdata.password.length < 8) {
        send(res, {
            status: 400,
            message: ["password must be 8 characters or greater."]
        });
        return false;
    }
    return true;
}
exports.validatePassword = validatePassword;
