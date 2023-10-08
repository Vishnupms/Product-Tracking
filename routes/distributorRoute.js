import express, { Router } from "express";
import * as controller from '../controllers/distributorController.js'
const router = express.Router();


//distribute-product
router.post("/distribute/:productId",controller.distributeProduct)

export default router;