import HttpError from "../helpers/HttpError.js";
import { ctrlWrapper } from "../helpers/ctrlWrapper.js";
import Book from './../models/book.js';

const getAllBooks = async (req, res) => {
    const { _id: owner } = req.user;
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;
    const result = await Book.find({ owner }, "-createdAt -updatedAt", { skip, limit }).populate("owner", "email subscription");
    res.json(result);
}

const getOneBook = async(req, res) => {
    const { id } = req.params;
    const result  = await Book.findById(id);
    if (!result) {
        throw HttpError(404)
    }
    res.json(result);
}

const createBook = async (req, res) => {
    const { _id: owner } = req.user;
    const result = await Book.create({ ...req.body, owner });
    res.status(201).json(result);
}

const updateBook = async (req, res) => {
    const { id } = req.params;
    const result = await Book.findByIdAndUpdate(id, req.body, {new: true});
    if (!result) {
        throw HttpError(400);
    }
    res.json(result);
};

const deleteBook = async (req, res) => {
    const { id } = req.params;
    const result = await Book.findByIdAndDelete(id);
    if (!result) {
        throw HttpError(404);
    }
    res.json({
        message: "Delete success",
    })
}

const updateFavorite = async (req, res) => {
    const { id } = req.params;
    const result = await Book.findByIdAndUpdate(id, req.body, { new: true });
    if (!result) {
        throw HttpError(400);
    }
    res.json(result);
}

const controllers = {
    getAllBooks: ctrlWrapper(getAllBooks),
    getOneBook: ctrlWrapper(getOneBook),
    createBook: ctrlWrapper(createBook),
    updateBook: ctrlWrapper(updateBook),
    deleteBook: ctrlWrapper(deleteBook),
    updateFavorite: ctrlWrapper(updateFavorite),
}

export default controllers;