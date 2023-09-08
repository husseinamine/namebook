import express from "express";
import jwt from "jsonwebtoken";
import { IUser, User, UserSchemaOptions } from "../models/user";
import { send, processErrors, validatePassword } from "./common";
import enviroment from "../enviroment";

const router = express.Router()
const SECRET = enviroment.SECRET as string

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

    let createduser;

    try {
        createduser = await User.create(userdata)
    } catch (e: any) {
        return processErrors(res, e, UserSchemaOptions)
    }

    let token = jwt.sign({
        id: createduser._id
    }, SECRET)

    return send(res, {
        status: 201,
        message: ["successfully created account.", {token}]
    }) 
})

export default { router }