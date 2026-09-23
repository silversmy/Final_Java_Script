const joi = require("joi");

const registerUserSchema = joi.object({
    firstName: joi.string().required(),
    lastName: joi.string().required(),
    email: joi.string().required().email(),
    password: joi.string().required().min(6).max(8)
}).strict();

const loginUserSchema = joi.object({
    email: joi.string().required().email(),
    password: joi.string().required().min(6).max(8)
}).strict();


const updateUserSchema = joi.object({

    firstName: joi.string(),
    lastName: joi.string(),
    email: joi.string().email(),
    password: joi.string().min(6).max(8)
}).strict();

const paginationSchema = joi.object({
    page: joi.number().integer().min(1).default(1),
    limit: joi.number().integer().min(1).max(100).default(10)
});


module.exports = {registerUserSchema, loginUserSchema, updateUserSchema, paginationSchema}