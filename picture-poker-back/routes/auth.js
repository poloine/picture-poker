import express from "express";
import authController from "../controllers/authController.js";

const router = express.Router();

//router.get("/register", authController.showRegister);
router.post("/register", authController.register);

//router.get("/login", authController.showLogin);
router.post("/login", authController.login);

// router.post("/logout", authController.logout);
//
// router.get('/forgot-password', authController.showForgotPassword);
// router.post('/forgot-password', authController.forgotPassword);
//
// router.get('/reset-password/:token', authController.showResetPassword);
// router.post('/reset-password/:token', authController.resetPassword);

export default router;
