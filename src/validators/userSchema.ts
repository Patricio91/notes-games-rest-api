import Joi from "joi"

export const UserSchema = Joi.object({
    firstname: Joi.string().alphanum().min(5).max(15).required(),
    lastname: Joi.string().alphanum().min(3).max(15).required(),
    username: Joi.string().alphanum().min(3).max(15).required(),
    password: Joi.string().min(3).max(20).pattern(new RegExp('^[a-zA-Z0-9]{3,20}$')).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
})

export const UpdateUserSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(15),
    password: Joi.string().min(3).max(20).pattern(new RegExp('^[a-zA-Z0-9]{3,20}$')),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
})