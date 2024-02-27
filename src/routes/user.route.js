import { Router } from "express";
import {
  productFunction,
  getAllProductFunction,
  getbynameFunction,
  ProfileFunction,
  UpdateFunction,
  deleteFunction,
} from "../controller/usercontroller.js";
import {
  verifyAccessToken,
  verifyRefreshToken,
} from "../helpers/verifyAccessToken.js";
const userRouter = Router();

//all product view
//post the product
//get product by id or name
//delete the product
//update the product

// userRouter.get("/");
//yeta user le afno profile herna milcha
userRouter.get("/profile", verifyAccessToken, ProfileFunction);
//post product
userRouter.post("/", verifyAccessToken, productFunction);
//view sab products
userRouter.get("/", verifyAccessToken, getAllProductFunction);
//view product by name in navbar
userRouter.get("/search", verifyAccessToken, getbynameFunction);
userRouter.put("/update", verifyAccessToken, UpdateFunction);
userRouter.delete("/delete", verifyAccessToken, deleteFunction);
export default userRouter;
