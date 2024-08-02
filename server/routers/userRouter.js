import { Router } from "express";
import {
  getAllUsers,
  login,
  logout,
  register,
  requestPasswordReset,
  resetPassword,
  sendOtp,
  userVerify,
} from "../controllers/userControllers.js";
import { UserVerification } from "../middleware/userMiddleware.js";

export const UserRouter = Router();

UserRouter.route("/users").get(getAllUsers);
UserRouter.route("/sendOtp").post(sendOtp)
UserRouter.route("/register").post(register);
UserRouter.route("/login").post(login);
UserRouter.route("/logout").get(logout);
UserRouter.route("/verification").get(UserVerification, userVerify);
UserRouter.route("/resetPassReq").post(requestPasswordReset);
UserRouter.route("/resetPassword").post(resetPassword);

//  http://localhost:1919/api
