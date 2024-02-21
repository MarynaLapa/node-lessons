import HttpError from "../helpers/HttpError.js";
import User from "../models/user.js"
import { ctrlWrapper } from './../helpers/ctrlWrapper.js';

const register = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (user) {
        throw HttpError(409, 'Email in use')
    }
    
    const newUser = await User.create(req.body);

    res.status(201).json({
        email: newUser.email,
        password: newUser.password,
    });
};

const login = async (req, res) => {
    
}

const controllers = {
    register: ctrlWrapper(register),
    login: ctrlWrapper(login),
}

export default controllers;