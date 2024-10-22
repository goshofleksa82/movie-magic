import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

import User from "../models/User.js";
import {SECRET} from '../config/constants.js';

const register = (email, password) => {
    return User.create({ email, password });

}

const login = async (email, password) => {
   //TODO: check if user exist
   const user = await User.findOne({ email });

   if(!user){
    throw new Error('User does not exist!');
   }

   //TODO: validate password
   const isValid = await bcrypt.compare(password, user.password);

   if(!isValid){
    throw new Error('PAssword does not match!');
   }

   //TODO: generate jwt token
   const payload = { 
    _id: user._id,
    email, 
};

const token = jwt.sign(payload, SECRET, { expiresIn: '2h' });


   //TODO: Return jwt token
}

export default {
    register,
    login,
}