import { Schema, model } from "mongoose";
import { handleMongooseError } from "../helpers/handleMongooseError.js";

export const emailRegaxp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        match: emailRegaxp,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        minlenght: 6,
        required: true,
    }
}, { versionKey: false, timestamps: true });

userSchema.post("save", handleMongooseError);

const User = model('user', userSchema);

export default User;
