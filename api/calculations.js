import express from "express";
import calculationsController from "../controllers/calculations.controller.js";
const router = express.Router();

router.get("/", calculationsController.getPreviousSessions);
router.get("/:id", calculationsController.getSingleSession);
router.post("/", calculationsController.calculate);

export default router;
