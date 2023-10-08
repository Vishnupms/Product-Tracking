import express, { Router } from "express";
import * as controller from '../controllers/manufacturerController.js'

const router = express.Router();


//add-product
router.post("/add-product",controller.addProduct)

// delete a manufactured product
router.delete("/delete-product/:productId",controller.deleteProduct)



export default router;