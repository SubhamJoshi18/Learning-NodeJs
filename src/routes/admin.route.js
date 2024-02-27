import { Router } from "express";
import {
  getAlluser,
  deleteUser,
  deleteAllUser,
} from "../controller/admin.controller.js";
import { isAdmin } from "../helpers/verifyAccessToken.js";
import { verifyAccessToken } from "../helpers/verifyAccessToken.js";

const adminRouter = Router();

//yo middleware stack ho first check auth ani admin xa ki xaina
adminRouter.get("/", verifyAccessToken, isAdmin, getAlluser);
adminRouter.delete("/delete", verifyAccessToken, isAdmin, deleteUser);
adminRouter.delete("/alldelete", verifyAccessToken, isAdmin, deleteAllUser);
export default adminRouter;
