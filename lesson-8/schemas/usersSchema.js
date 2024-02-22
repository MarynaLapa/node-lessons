import Joi from 'joi';
import { emailRegaxp, subscriptionEnum } from '../models/user.js';

export const registerSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email(emailRegaxp).required(),
    password: Joi.string().min(6).required(),
    subscription: Joi.string().valid(subscriptionEnum),
    token: Joi.string()
});

export const loginSchema = Joi.object({
    email: Joi.string().email(emailRegaxp).required(),
    password: Joi.string().min(6).required(),
})

export const subscriptionSchema = Joi.object({
    subscription: Joi.string().required(),
})