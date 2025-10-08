import express from "express";
import userController from "../controllers/userController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/me", authenticate, userController.getUserProfile);

router.get("/me/games", authenticate, userController.getGameHistory);

export default router;
