import Joi from "joi";
import { dateRegexp, genreList } from "../models/book.js";

export const createBooksSchema = Joi.object({
    title: Joi.string().required(),
    author: Joi.string().required(),
    favorite: Joi.boolean(),
    genre: Joi.string().valid(...genreList).required(),
    date: Joi.string().pattern(dateRegexp).required()
})

export const updateBooksSchema = Joi.object({
    title: Joi.string(),
    author: Joi.string(),
    favorite: Joi.boolean(),
    genre: Joi.string().valid(...genreList),
    date: Joi.string().pattern(dateRegexp) 
})

export const updateFavoriteSchema = Joi.object({
    favorite: Joi.boolean().required(),
}) 