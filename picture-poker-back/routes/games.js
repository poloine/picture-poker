import express from "express";
import gameController from "../controllers/gameController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/:uuid", authenticate, gameController.getGameDetail);

export default router;
