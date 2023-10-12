import express, { Router } from "express";
import * as controller from '../controllers/retailerController.js'
import { validateProductId } from "../helpers/validateProductId.js";
const router = express.Router();


//distribute-product
router.patch("/retail-product/:productId",validateProductId(),controller.retailProduct)

//cancel- retailing /
router.patch("/cancel-retail/:productId",validateProductId(),controller.cancelRetailing)


export default router;