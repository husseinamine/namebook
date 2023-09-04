"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("../models/user");
const common_1 = require("./common");
const router = express_1.default.Router();
router.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userdata = {
        username: req.body.username,
        password: req.body.password
    };
    if (userdata.username == null || userdata.password == null) {
        return (0, common_1.send)(res, {
            status: 400,
            message: "username or password not specified."
        });
    }
    try {
        yield user_1.User.create(userdata);
    }
    catch (e) {
        return (0, common_1.processErrors)(res, e, user_1.UserSchemaOptions);
        // switch (-1) {
        //     case e.message.indexOf("duplicate key error"):
        //         return send(res, {
        //             status: 400,
        //             message: "user already exists."
        //         }) 
        //     case e.message.indexOf(errors.UsernameMinLengthError):
        //         return send(res, {
        //             status: 400,
        //             message: errors.UsernameMinLengthError
        //         }) 
        //     default:
        //         console.log(e)
        //         return send(res, {
        //             status: 500,
        //             message: "unexpected server error."
        //         }) 
        // }
    }
    return (0, common_1.send)(res, {
        status: 201,
        message: "successfully created account."
    });
}));
exports.default = { router };
