import jwt from "jsonwebtoken";
import { SECRET } from "../config/constants.js";

export const authMiddleware = (req, res, next) => {
    //TODO: Check if there is a token in the request
    const token = req.cookies['auth'];

    if (!token) {
        return next();
    }
    //TODO: VAlidate token
    try {
        const decodedToken = jwt.verify(token, SECRET);

        return next();
    } catch (err) {
//TODO: Invalid token
    }



    //TODO: Add user data to request
};