import jwt from "jsonwebtoken";
import { SECRET } from "../config/constants.js";

export const authMiddleware = (req, res, next) => {
    //TODO: Check if there is a token in the request
    const token = req.cookies['auth'];
    console.log(token);
    

    if (!token) {
        return next();
    }
    //TODO: VAlidate token
    try {
        const decodedToken = jwt.verify(token, SECRET);

        //TODO: Add user data to request
        req.user = {
            _id: decodedToken._id,
            email: decodedToken.email,
        };
            
        return next();

    } catch (err) {
      
       
        res.clearCookie('auth');

        res.redirect('/auth/login')

    }




};