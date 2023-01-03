import Joi from "joi";

export const noteSchema = Joi.object({
    game_name: Joi.string().min(2).max(40).required(),
    description: Joi.string().min(10).max(200).required(),
    year: Joi.number().integer().min(1900).max(2030),
    price: Joi.number().integer().min(0).max(1000).required(),
    console: Joi.string().min(2).max(20).required(),
    link: Joi.string().min(10).max(100),
    user_id: Joi.number().max(20).required()
})

export const updateNoteSchema = Joi.object({
    game_name: Joi.string().min(2).max(40),
    description: Joi.string().min(10).max(200),
    year: Joi.number().integer().min(1900).max(2030),
    price: Joi.number().integer().min(0).max(1000),
    console: Joi.string().min(2).max(20),
    link: Joi.string().min(10).max(100)
})