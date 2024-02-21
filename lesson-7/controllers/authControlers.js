import User from "../models/user"


const register = async(req, res) => {
    const newUser = await User.create(req.body);

    res.status(201).json({
        email: newUser.name,
        password: newUser.password,
    })
}

const controllers = {
    register: ctrlWrapper(register),
}

export default controllers;