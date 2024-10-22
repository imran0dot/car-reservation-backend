import jwt from "jsonwebtoken";
import config from "../config";
import { ObjectId } from "mongoose";

export interface IToken {
    id: ObjectId;
    name: string;
    email: string;
    role: "admin" | "user" ;
}

export const createToken = (userData: IToken) => {
    //create a new token
    const token = jwt.sign(userData, config.jwt_secret as string, { expiresIn: '1h' });
    return token;
}