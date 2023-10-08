import express, { Router } from "express";
import * as controller from '../controllers/retailerController.js'
const router = express.Router();


//distribute-product
router.put("/retail-product/:productId",controller.retailProduct)

export default router;