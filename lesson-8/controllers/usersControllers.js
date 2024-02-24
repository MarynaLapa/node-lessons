import HttpError from "../helpers/HttpError.js";
import User from "../models/user.js"
import { ctrlWrapper } from './../helpers/ctrlWrapper.js';

const getAllUsers = async (req, res) => {
    const result = await User.find({}, "-createdAt -updatedAt");
    res.json(result);
};

const getOneUser = async (req, res) => {
    const { id } = req.params;
    const result = await User.findById(id);
    if (!result) {
        throw HttpError(400);
    }
    res.json(result);
};

const deleteUser = async (req, res) => {
    const { id } = req.params;
    const result = await User.findByIdAndDelete(id);
    if (!result) {
        throw HttpError(404);
    };
    res.json({
        message: "Delete success"
    });
}

const updateSubscription = async (req, res) => {
    const { id } = req.user;
    console.log('id', id); 
    console.log('req.body', req.body)
    const result = await User.findByIdAndUpdate(id, req.body, { new: true });
    console.log('result', result);

    if (!result) {
        throw HttpError(400);
    };
    res.json(result);
}

const controllers = {
    getAllUsers: ctrlWrapper(getAllUsers),
    getOneUser: ctrlWrapper(getOneUser),
    deleteUser: ctrlWrapper(deleteUser),
    updateSubscription: ctrlWrapper(updateSubscription)
}

export default controllers;