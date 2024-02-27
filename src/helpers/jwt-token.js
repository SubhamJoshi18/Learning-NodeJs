import jwt from "jsonwebtoken";
import createError from "http-errors";
export const AccessToken = async function (userid) {
  return new Promise((resolve, reject) => {
    const payload = {
      aud: userid,
    };
    const secret = process.env.ACCESS_TOKEN;
    const options = {
      expiresIn: "1h",
      issuer: "randomwebsite",
    };
    jwt.sign(payload, secret, options, (err, token) => {
      if (err) {
        reject(createError.Unauthorized("Error generating an access Token"));
      } else {
        resolve(token);
      }
    });
  });
};

export const RefreshToken = async function (userid) {
  return new Promise((resolve, reject) => {
    const payload = {
      aud: userid,
    };
    const secret = process.env.REFRESH_TOKEN;
    const options = {
      expiresIn: "1y",
      issuer: "randomwebsite",
    };
    jwt.sign(payload, secret, options, (err, token) => {
      if (err) {
        reject(createError.Unauthorized("Error generating an Refresh Token"));
      } else {
        resolve(token);
      }
    });
  });
};
