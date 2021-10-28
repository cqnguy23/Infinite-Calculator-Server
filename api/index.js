import express from "express";
import calculationApi from "./calculations.js";
const router = express.Router();

router.use("/calculation", calculationApi);

export default router;
