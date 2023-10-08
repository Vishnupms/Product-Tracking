import express, { Router } from "express";
import * as controller from '../controllers/retailerController.js'
import { verifyDistributor } from "../middlewares/verifyDistributor.js";
const router = express.Router();


//distribute-product
router.post("/distribute/:productId",verifyDistributor,controller.distributeProduct)

export default router;