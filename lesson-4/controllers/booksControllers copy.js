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

export const getAllBooks = async (req, res, next) => {
    try {
        const result = await getAll();
        res.json(result);
    } catch (error) {
        next(error);
        // res.status(500).json({
        //     message: "Server error"
        // })
    }
}

export const getOneBook = async(req, res, next) => {
    const { id } = req.params;
    const result  = await getById(id);

    if (!result) {
        throw HttpError(404)
        // const error = new Error("Not found")
        // error.status = 404;
        // throw error;
        // return res.status(404).json({
        //     message: "Not found"
        // }) 
    }
    res.json(result);
}

export const createBook = async (req, res, next) => {
    const { error } = createBooksSchema.validate(req.body);
    if (error) {
        throw HttpError(400, error.message)
    }
    const result = await addBook(req.body);
    res.status(201).json(result);
}

export const updateBook = async (req, res, next) => {
    try {
        const { error } = createBooksSchema.validate(req.body);
        if (error) {
            throw HttpError(400, error.message)
        }
        const { id } = req.params;
        const result = await updateById(id, req.body);
        if (!result) {
            throw HttpError(400);
        }
        res.json(result);
    } catch (error) {
        next(error)
    }
};

export const deleteBook = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await removeById(id);
        if (!result) {
            throw HttpError(404);
        }
        res.json({
            message: "Delete success",
        })
    } catch (error) {
        next(error);
    }
}

