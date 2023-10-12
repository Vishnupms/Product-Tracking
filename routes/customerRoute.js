import express, { Router } from "express";
import * as controller from '../controllers/customerController.js'
const router = express.Router();
import { validateProductId } from "../helpers/validateProductId.js";


//deliver-product
router.patch("/deliver-product/:productId",validateProductId(),controller.deliverProduct)

//track-my-product
router.get("/track-my-product/:productId",validateProductId(),controller.trackMyProduct)



export default router;
