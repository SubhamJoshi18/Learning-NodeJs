import { Router } from "express";
import {
  signupFunction,
  signinFunction,
  generateRefreshToken,
} from "../controller/controller.js";
import { verifyAccessToken } from "../helpers/verifyAccessToken.js";
const authrouter = Router();

authrouter.post("/signup", signupFunction);
authrouter.post("/signin", signinFunction);
authrouter.get("/check", verifyAccessToken, (req, res) => {
  res.json({
    message: "You are verified",
  });
});
authrouter.post("/refresh-token", generateRefreshToken);
export default authrouter;
