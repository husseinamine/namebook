import { Schema, model } from "mongoose";

interface IUser {
    username: string
    password: string
}

const constraints = {
    USERNAME_MIN_LENGTH: 3,
    USERNAME_MAX_LENGTH: 24,
}

const errors = {
    UsernameRequiredError:  "username is required.",
    UsernameUniqueError:    "username already exists.",
    UsernameMinLengthError: `username cannot be less than ${constraints.USERNAME_MIN_LENGTH} characters.`,
    UsernameMaxLengthError: `username cannot be greater than ${constraints.USERNAME_MAX_LENGTH} characters.`,

    PasswordRequiredError:  "password is required.",
}

const UserSchemaOptions = {
    username: {
        type: String,
        required:  [true, errors.UsernameRequiredError],
        unique:    [true, errors.UsernameUniqueError],
        minLength: [constraints.USERNAME_MIN_LENGTH,  errors.UsernameMinLengthError],
        maxLength: [constraints.USERNAME_MAX_LENGTH,  errors.UsernameMaxLengthError]
    },
    password: {
        type: String,
        required: [true, errors.PasswordRequiredError]
    },
}

const UserSchema = new Schema(UserSchemaOptions)

const User = model('user', UserSchema)

export { User, IUser, UserSchemaOptions };