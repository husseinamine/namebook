import express from "express";
import path from "path";
import bodyParser from "body-parser";

async function middleware(app: express.Express) {
    app.use("/public", express.static(path.join(__dirname, "..", "public")));
    
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
}

export default middleware