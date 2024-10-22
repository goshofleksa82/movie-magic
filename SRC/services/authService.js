import bcrypt from 'bcrypt'
import User from "../models/User.js";

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

   //TODO: Return jwt token
}

export default {
    register,
    login,
}