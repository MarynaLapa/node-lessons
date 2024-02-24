import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotevn from 'dotenv';

import HttpError from "../helpers/HttpError.js";
import User from "../models/user.js"
import { ctrlWrapper } from './../helpers/ctrlWrapper.js';

const register = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
        throw HttpError(409, 'Email in use')
    }
    
    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({...req.body, password:hashPassword});

    res.status(201).json({
        email: newUser.email,
        subscription: newUser.subscription,
    });
};

const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        throw HttpError(401, "Email or password is wrong");
    };

    const passwordCompare = await bcrypt.compare(password, user.password);

    if (!passwordCompare) {
        throw HttpError(401, "Email or password is wrong");
    };

    dotevn.config() 
    const { SECRET_KEY } = process.env;

    const payload = {
        id: user._id
    }

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" }); 
    
    await User.findByIdAndUpdate(user._id, { token });

    res.json({
        token,
        user: {
            email,
            subscription: user.subscription
            //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZDhjOTRhMzc0Zjk2ZDlmMWY4OTViMCIsImlhdCI6MTcwODc3MDM4MSwiZXhwIjoxNzA4ODUzMTgxfQ.T9T_LbKWVR681Db7p4MX5-_U0PdgE0p5WhzfL8X_vQQ
        }
    });
}

const current = async (req, res) => {
    const { email, subscription } = req.user;

    res.json({
        email,
        subscription
    })
};

const logout = async (req, res) => {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: "" });

    res.status(204).json({
        message: "Logout success"
    });
};

const controllers = {
    register: ctrlWrapper(register),
    login: ctrlWrapper(login),
    current: ctrlWrapper(current),
    logout: ctrlWrapper(logout),
}

export default controllers;