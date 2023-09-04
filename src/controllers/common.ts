import express from "express";

interface SendOptions {
    status: number,
    message: string,
}

function send(res: express.Response, options: SendOptions): express.Response {
    res.status(options.status)

    return res.json({
        "status": options.status,
        "message": options.message
    }) 
}

function processErrors(res: express.Response, e: any, schema: any): express.Response {
    for (let field in schema) {
        for (let key in schema[field]) {
            let value = schema[field][key]

            if (typeof value === "object" && value.length === 2) {
                if (e.message.indexOf(value[1]) !== -1) {
                    return send(res, {
                        status: 400,
                        message: value[1]
                    }) 
                }
            }
        }
    }

    console.log(e)
                
    return send(res, {
        status: 500,
        message: "unexpected server error."
    }) 
}

export { send, processErrors }