"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errors = exports.UserSchemaOptions = exports.User = void 0;
const mongoose_1 = require("mongoose");
const errors = {
    UsernameRequiredError: "username is required.",
    UsernameUniqueError: "username already exists.",
    UsernameMinLengthError: "username cannot be less than 3 characters.",
    UsernameMaxLengthError: "username cannot be greater than 24 characters."
};
exports.errors = errors;
const UserSchemaOptions = {
    username: {
        type: String,
        required: [true, errors.UsernameRequiredError],
        unique: [true, errors.UsernameUniqueError],
        minLength: [3, errors.UsernameMinLengthError],
        maxLength: [24, errors.UsernameMaxLengthError]
    },
    password: {
        type: String,
        required: true
    },
};
exports.UserSchemaOptions = UserSchemaOptions;
const UserSchema = new mongoose_1.Schema(UserSchemaOptions);
const User = (0, mongoose_1.model)('user', UserSchema);
exports.User = User;
