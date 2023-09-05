import { Schema, model } from "mongoose";

interface IUser {
    username: string
    password: string
}

const constraints = {
    UsernameMinLength: 3,
    UsernameMaxLength: 24,
}

const errors = {
    UsernameRequiredError:  "username is required.",
    UsernameUniqueError:    "username already exists.",
    UsernameMinLengthError: `username cannot be less than ${constraints.UsernameMinLength} characters.`,
    UsernameMaxLengthError: `username cannot be greater than ${constraints.UsernameMaxLength} characters.`,

    PasswordRequiredError:  "password is required.",
}

const UserSchemaOptions = {
    username: {
        type: String,
        required:  [true, errors.UsernameRequiredError],
        unique:    [true, errors.UsernameUniqueError],
        minLength: [constraints.UsernameMinLength,  errors.UsernameMinLengthError],
        maxLength: [constraints.UsernameMaxLength,  errors.UsernameMaxLengthError]
    },
    password: {
        type: String,
        required: [true, errors.PasswordRequiredError]
    },
}

const UserSchema = new Schema(UserSchemaOptions)

const User = model('user', UserSchema)

export { User, IUser, UserSchemaOptions };