import express from "express";
import calculationsController from "../controllers/calculations.controller.js";
const router = express.Router();

router.get("/", calculationsController.getPreviousSessions);
router.post("/", calculationsController.calculate);

export default router;
