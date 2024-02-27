import jwt from "jsonwebtoken";
import userModel from "../models/model.js";

export const verifyAccessToken = async function (req, res, next) {
  try {
    console.log(req.headers["authorization"]);
    const AuthToken = req.headers["authorization"];
    if (!AuthToken) {
      return res.status(403).json({
        message: "You are Not Logged In , Please Register or Log In",
      });
    }
    const Bearer = AuthToken.split(" ");
    const token = Bearer[1];
    const payload = jwt.verify(token, process.env.ACCESS_TOKEN);
    const user = await userModel.findOne({ _id: payload.aud });
    if (!user) {
      return res.status(403).json({
        message: "You are not UnAuthorized",
      });
    }
    req.user = user;
    console.log(Bearer);
    console.log(token);
    console.log(payload);
    console.log(user);
    next();
  } catch (err) {}
};

export const isAdmin = async function (req, res, next) {
  if (req.user.role === "admin") {
    console.log("You are An Admin ! Please Kindly processed");
    next();
  } else {
    return res.status(403).json({
      message: "You Do not have this permission to access This Route",
    });
  }
};

export const verifyRefreshToken = async function (refreshToken) {
  return new Promise((resolve, reject) => {
    const secret = process.env.REFRESH_TOKEN;
    const token = refreshToken;
    jwt.verify(token, secret, (err, payload) => {
      const userid = payload.aud;
      resolve(userid);
    });
  });
};
