import { Response } from "express"

type TSendResponse = {
    success: boolean,
    statusCode: number,
    errorMessages?: string
    message?: string,
    data: any,
    token?: string,
    stack?: string
};


const sendResponse = (res: Response, {
    success,
    statusCode,
    message,
    data,
    token,
    errorMessages,
    stack
}: TSendResponse) => {
    res.status(statusCode).send({
        success,
        statusCode,
        message,
        data,
        token,
        errorMessages,
        stack
    })
};


export default sendResponse;