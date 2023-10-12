import express, { Router } from "express";
import * as controller from '../controllers/manufacturerController.js'
import { validateProduct } from "../helpers/validateProduct.js";
import { validateProductId } from "../helpers/validateProductId.js";

const router = express.Router();


//add-product
router.post("/add-product",validateProduct,controller.addProduct)

// delete a manufactured product if the product is just manufactured / in case product has anu defects
router.delete("/delete-product/:productId",validateProductId(),controller.deleteProduct)



export default router;