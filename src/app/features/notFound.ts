import { Request, Response } from "express"
import sendResponse from "./sendResponse"

const notFound = (err: any, req: Request, res: Response) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    return sendResponse(res, {
        success: false,
        data: "",
        message,
        statusCode,
    });
};


export default notFound;