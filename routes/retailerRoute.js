import express, { Router } from "express";
import * as controller from '../controllers/retailerController.js'
const router = express.Router();


//distribute-product
router.patch("/retail-product/:productId",controller.retailProduct)

//cancel- retailing
router.patch("/cancel-retail/:productId",controller.cancelRetailing)


export default router;