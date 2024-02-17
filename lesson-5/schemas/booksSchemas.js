import Joi from "joi";

export const createBooksSchema = Joi.object({
    title: Joi.string().required(),
    author: Joi.string().required(),
})

