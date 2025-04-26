// routes/authRoutes.js
import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
} from "../controllers/auth.controller.js";
import {
  loginUserValidator,
  registerUserValidator,
} from "../validators/auth.validator.js";
import authValidator from "../middlewares/authValidator.middleware.js";
import isAuthenticated from "../middlewares/isAuthenticated.middleware.js";

const router = express.Router();

router.post("/register", registerUserValidator(), authValidator, registerUser);
router.post("/login", loginUserValidator(), authValidator, loginUser);
router.get("/logout", isAuthenticated, logoutUser);

export default router;
