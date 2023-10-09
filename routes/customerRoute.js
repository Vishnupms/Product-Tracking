import express, { Router } from "express";
import * as controller from '../controllers/customerController.js'
const router = express.Router();


//distribute-product
router.patch("/deliver-product/:productId",controller.deliverProduct)



export default router;