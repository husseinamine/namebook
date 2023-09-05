import express from "express";
import { IUser, User, UserSchemaOptions } from "../models/user";
import { send, processErrors, validatePassword } from "./common";

const router = express.Router()

router.post("/register", async (req, res) => {
    const userdata: IUser = {
        username: req.body.username,
        password: req.body.password
    }

    if (userdata.username == null || userdata.password == null) {
        return send(res, {
            status: 400,
            message: ["username or password not specified."]
        }) 
    }

    if (!validatePassword(res, userdata)) {
        return
    }

    try {
        await User.create(userdata)
    } catch (e: any) {
        return processErrors(res, e, UserSchemaOptions)
    }

    return send(res, {
        status: 201,
        message: ["successfully created account."]
    }) 
})

export default { router }