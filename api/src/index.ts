import express from "express"
import mongoose from "mongoose"

import middleware from "./middleware";
import authentication from "./controllers/authentication";

main().catch(err => console.log(err))

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/namebook")

    const app = express()

    middleware(app)

    app.use("/auth", authentication.router)

    app.listen(8080, async () => console.log("started."))
}
