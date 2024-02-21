import Joi from "joi";

const phoneRegexp = /^\+(?:[0-9] ?){6,14}[0-9]$/;

export const createContactSchema = Joi.object({
    name: Joi.string().min(2).max(255).required(),
    email: Joi.string().min(4).max(255).required().email(),
    phone: Joi.string().min(4).max(20).pattern(phoneRegexp).required(),
    favotite: Joi.boolean(),
})

export const updateContactSchema = Joi.object({
    name: Joi.string().min(2).max(255),
    email: Joi.string().min(4).max(255),
    phone: Joi.string().min(4).max(20).pattern(phoneRegexp),
    favorite: Joi.boolean(),
})

export const updateFavoriteSchema = Joi.object({
    favorite: Joi.boolean().required(),
})