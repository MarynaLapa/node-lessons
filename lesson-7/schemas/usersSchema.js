import Joi from 'joi';
import { emailRegaxp } from '../models/user.js';

export const registerSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email(emailRegaxp).required(),
    password: Joi.string().min(6).required(),
});

export const loginSchema = Joi.object({
    email: Joi.string().email(emailRegaxp).required(),
    password: Joi.string().min(6).required(),
})