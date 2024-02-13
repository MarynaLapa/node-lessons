import {
    addBook,
    getAll,
    getById,
    removeById,
    updateById
} from "../services/booksServices.js";
import HttpError from "../helpers/HttpError.js";
import { createBooksSchema } from "../schemas/booksSchemas.js";
import { ctrlWrapper } from "../helpers/ctrlWrapper.js";

const getAllBooks = async (req, res) => {
    const result = await getAll();
    res.json(result);
}

const getOneBook = async(req, res) => {
    const { id } = req.params;
    const result  = await getById(id);
    if (!result) {
        throw HttpError(404)
    }
    res.json(result);
}

const createBook = async (req, res) => {
    const result = await addBook(req.body);
    res.status(201).json(result);
}

export const updateBook = async (req, res) => {
    // const { error } = createBooksSchema.validate(req.body);
    // if (error) {
    //     throw HttpError(400, error.message)
    // }
    const { id } = req.params;
    const result = await updateById(id, req.body);
    if (!result) {
        throw HttpError(400);
    }
    res.json(result);
};

const deleteBook = async (req, res) => {
    const { id } = req.params;
    const result = await removeById(id);
    if (!result) {
        throw HttpError(404);
    }
    res.json({
        message: "Delete success",
    })

}

const controllers = {
    getAllBooks: ctrlWrapper(getAllBooks),
    getOneBook: ctrlWrapper(getOneBook),
    createBook: ctrlWrapper(createBook),
    updateBook: ctrlWrapper(updateBook),
    deleteBook: ctrlWrapper(deleteBook),
}

export default controllers;