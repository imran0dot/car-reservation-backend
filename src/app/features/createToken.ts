import jwt from "jsonwebtoken";
import config from "../config";
import { ObjectId } from "mongoose";

export interface IToken {
    userId: string;
    name: string;
    email: string;
    role: "customer" | "admin";
}

export const createToken = (userData: IToken, secretToken: string, expiresIn: string) => {
    //create a new token
    return jwt.sign(userData, secretToken as string, { expiresIn: expiresIn });
}