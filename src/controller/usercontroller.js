import createError from "http-errors";
import { productValidation } from "../helpers/validator.js";
import productModel from "../models/products.js";
import Joi from "joi";
export const productFunction = async (req, res, next) => {
  try {
    const { error } = productValidation.validateAsync(req.body);
    // const { ...product } = req.body;
    const { title, price, rating, description, Stocks, Reviews } = req.body;

    const newProduct = new productModel({
      title: title,
      price: price,
      rating: rating,
      description: description,
      Stocks: Stocks,
      Reviews: Reviews,
    });
    console.log(newProduct);
    const newProductAdded = await newProduct.save();
    res.json({
      Success: true,
      newProduct: {
        newProductAdded,
      },
    });
  } catch (err) {
    if (err instanceof Joi) {
      next(createError.BadRequest("Error Posting the product"));
    }
    return res.status(404).json({
      Success: false,
      message: "Error Posting the Product",
    });
  }
};

export const getAllProductFunction = async (req, res, next) => {
  try {
    let emptyObject = {};
    //const findall = await productModel.findOne({})
    //return first element of document in the collection
    const findall = await productModel.find(emptyObject);
    if (findall.length === 0) {
      return res.status(404).json({
        message: "No Item Found in the Database",
      });
    }
    res.status(201).json({
      Success: true,
      message: "Retriving data from the database",
      Products: {
        findall,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const getbynameFunction = async (req, res, next) => {
  try {
    const { title } = req.body;

    const findByName = await productModel.findOne({ title: title });
    if (!findByName) {
      return res.status(403).json({
        Success: false,
        message: "The Product You are Looking for is not available",
      });
    }
    return res.status(201).json({
      Success: true,
      message: "Here is your Product",
      Products: {
        findByName,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const ProfileFunction = async function (req, res, next) {
  return res.json({
    Success: true,
    message: `${req.user.name} Profile is Given`,
    Data: {
      Email: `${req.user.email}`,
      Password: `${req.user.password}`,
      role: `${req.user.role}`,
    },
  });
};

export const UpdateFunction = async (req, res, next) => {
  try {
    const { title, price, rating, Stocks, description } = req.body;

    const findtheUser = await productModel.updateOne(
      { title: title },
      {
        $set: {
          price: price,
          rating: rating,
          Stocks: Stocks,
          description: description,
        },
      }
    );
    return res.status(201).json({ findtheUser });
  } catch (err) {
    next(err);
  }
};

export const deleteFunction = async (req, res, next) => {
  const { title } = req.body;
  try {
    const deletetheUser = await productModel.deleteOne({
      title: title,
    });
    return res.status(201).json({
      message: "Product Has Been Deleted SuccessFully",
    });
  } catch (err) {
    next(err);
  }
};
