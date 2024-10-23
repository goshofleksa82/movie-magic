import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

import User from "../models/User.js";
import { SECRET } from '../config/constants.js';

const register = (email, password) => {
    return User.create({ email, password });

}

const login = async (email, password) => {
    //TODO: check if user exist
    //const user = await User.findOne({ email });
    const user = await User.findOne().where('email').equals(email);

    if (!user) {
        throw new Error('User does not exist!');
    };

    //TODO: validate password
    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        throw new Error('Password does not match!');
    };

    //TODO: generate jwt token
    const payload = {
        _id: user._id,
        email,
    };

    const token = jwt.sign(payload, process.env.SECRET, { expiresIn: '2h' });


    //TODO: Return jwt token
    return token;
}

export default {
    register,
    login,
}