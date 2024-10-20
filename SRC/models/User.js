import { Schema, model } from "mongoose";
import bcrypt from 'bcrypt';

const saltRounds = 10

const userSchema = new Schema({
    email: String,
    password: String,
});

userSchema.pre('save', async function() {
    const hash = await bcrypt.hash(this.password, saltRounds);

    this.password = hash;
})

const User = model('User', userSchema);

export default User;