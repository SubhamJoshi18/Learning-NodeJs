import joi from "joi";

export const signupValidation = joi.object({
  name: joi.string().lowercase().required(),
  email: joi.string().email().min(10).lowercase().required(),
  password: joi.string().min(8).required(),
  role: joi.string().optional(),
});

export const signinValidation = joi.object({
  email: joi.string().email().min(8).lowercase().required(),
  password: joi.string().min(8).required(),
});

export const productValidation = joi.object({
  title: joi.string().required(),
  price: joi.number().required(),
  rating: joi.number().required(),
  Stocks: joi.number().required(),
  description: joi.string().required(),
  Reviews: joi.array().optional(),
});
