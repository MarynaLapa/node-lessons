import HttpError from "../helpers/HttpError.js";
import { ctrlWrapper } from "../helpers/ctrlWrapper.js";
import Contact from "../models/contact.js";

const getAllContacts = async(req, res) => {
    const result = await Contact.find({}, "-createdAt -updatedAt");
    res.json(result)
};

export const getOneContact = async (req, res) => {
    const { id } = req.params;
    const result = await Contact.findById(id);
    if (!result) {
        throw HttpError(400)
    }
    res.json(result);
};

export const deleteContact = async(req, res) => {
    const { id } = req.params;
    const result = await Contact.findByIdAndDelete(id);
    if (!result) {
        throw HttpError(404)
    }
    res.json({
        message: "Delete success",
    })
};

export const createContact = async (req, res) => {
    const result = await Contact.create(req.body);
    res.status(201).json(result);
};

export const updateContact = async (req, res) => {
    const { id } = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body, {new: true});
    if (!result) {
        throw HttpError(400)
    }
    res.json(result);
};

export const updateStatusContact = async (req, res) => {
    const { id} = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body);
    if (!result) {
        throw HttpError(404);
    }
    res.json(result);
}

const controllers = {
    getAllContacts: ctrlWrapper(getAllContacts),
    getOneContact: ctrlWrapper(getOneContact),
    deleteContact: ctrlWrapper(deleteContact),
    createContact: ctrlWrapper(createContact),
    updateContact: ctrlWrapper(updateContact),
    updateStatusContact: ctrlWrapper(updateStatusContact),
};

export default controllers;