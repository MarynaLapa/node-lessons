import { ctrlWrapper } from './../helpers/ctrlWrapper.js';
import current from "./authControllers/current.js";
import login from "./authControllers/login.js";
import logout from "./authControllers/logout.js";
import register from "./authControllers/register.js";

const controllers = {
    register: ctrlWrapper(register),
    login: ctrlWrapper(login),
    current: ctrlWrapper(current),
    logout: ctrlWrapper(logout),
}

export default controllers;