"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchemaOptions = exports.User = void 0;
const mongoose_1 = require("mongoose");
const constraints = {
    UsernameMinLength: 3,
    UsernameMaxLength: 24,
};
const errors = {
    UsernameRequiredError: "username is required.",
    UsernameUniqueError: "username already exists.",
    UsernameMinLengthError: `username cannot be less than ${constraints.UsernameMinLength} characters.`,
    UsernameMaxLengthError: `username cannot be greater than ${constraints.UsernameMaxLength} characters.`,
    PasswordRequiredError: "password is required.",
};
const UserSchemaOptions = {
    username: {
        type: String,
        required: [true, errors.UsernameRequiredError],
        unique: [true, errors.UsernameUniqueError],
        minLength: [constraints.UsernameMinLength, errors.UsernameMinLengthError],
        maxLength: [constraints.UsernameMaxLength, errors.UsernameMaxLengthError]
    },
    password: {
        type: String,
        required: [true, errors.PasswordRequiredError]
    },
};
exports.UserSchemaOptions = UserSchemaOptions;
const UserSchema = new mongoose_1.Schema(UserSchemaOptions);
const User = (0, mongoose_1.model)('user', UserSchema);
exports.User = User;
