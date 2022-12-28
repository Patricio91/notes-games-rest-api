import Joi from "joi";

export const gameSchema = Joi.object({
    name: Joi.string().min(2).max(40).required(),
    description: Joi.string().min(10).max(100).required(),
    year: Joi.number().integer().min(1900).max(2024),
    category: Joi.string().min(3).max(10).required(),
    price: Joi.number().integer().min(0).max(1000).required(),
    console: Joi.string().min(2).max(20).required(),
})