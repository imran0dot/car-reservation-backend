import { NextFunction, Request, Response } from "express";
import sendResponse from "./sendResponse";

const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    if (err) {
        const statusCode = err.statusCode || 500; 
        const message = err.message || "Internal Server Error"; 
        return sendResponse(res, {
            success: false,
            data: "",
            errorMessages: message, 
            statusCode, 
        });
    }
    
    return next();
};

export default globalErrorHandler;