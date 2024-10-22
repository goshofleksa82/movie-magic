import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

import User from "../models/User.js";

const SECRET = '18ba07130b39f2fe9ca139e4e42f9a07d718aa4685f399b705253c2ed4b8f3c0';

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