import createError from "http-errors";
import userModel from "../models/model.js";
import bcrypt from "bcryptjs";
import { signupValidation, signinValidation } from "../helpers/validator.js";
import { AccessToken, RefreshToken } from "../helpers/jwt-token.js";
import { verifyRefreshToken } from "../helpers/verifyAccessToken.js";
export const signupFunction = async (req, res, next) => {
  try {
    const { error } = signupValidation.validateAsync(req.body);
    if (error) {
      next(createError.BadRequest("INVALD Validaion Error"));
    }
    console.log(req.body);
    const { name, email, password, role } = req.body;
    const findEmail = await userModel.findOne({ email: email });
    if (findEmail) {
      throw createError.Conflict(
        "The Email You have entered has been already Register"
      );
    }
    //hashed the password to the database
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);

    const newuser = new userModel({
      name: name,
      email: email,
      password: hashedpassword,
      role: role,
    });

    const userCreated = await newuser.save();
    res.json({
      Success: true,
      NewUser: {
        userCreated,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const signinFunction = async (req, res, next) => {
  try {
    const { error } = signinValidation.validateAsync(req.body);
    if (error) {
      next(createError.BadRequest("INVALD Validaion Error"));
    }
    const { email, password } = req.body;
    const findEmail = await userModel.findOne({ email: email });
    if (!findEmail) {
      throw createError.Conflict("The Email you have entered Is Incorrect");
    }

    const checkPassword = await bcrypt.compare(password, findEmail.password);
    console.log(checkPassword);
    if (!checkPassword) {
      throw createError.Conflict("The password you have entered Is Incorrect");
    }

    const accessToken = await AccessToken(findEmail.id);
    const refreshToken = await RefreshToken(findEmail.id);
    res.json({
      Success: true,
      message: "You Have SuccessFully Logged In",
      AccessToken: {
        accessToken,
      },
      RefreshToken: {
        refreshToken,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const generateRefreshToken = async (req, res, next) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    throw createError.Conflict("Refresh Token does not exist");
  }
  const userid = await verifyRefreshToken(refreshToken);
  const newAccessToken = await AccessToken(userid);
  const newRefreshToken = await RefreshToken(userid);

  res.json({
    Success: true,
    message: "Generate an Refresh Token",
    newAccessToken: {
      newAccessToken,
    },
    newRefreshToken: {
      newRefreshToken,
    },
  });
};
