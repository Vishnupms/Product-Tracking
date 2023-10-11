import express, { Router } from "express";
import * as controller from '../controllers/distributorController.js'
import { validateProductId } from "../helpers/validateProductId.js";
const router = express.Router();


//distribute-product
router.patch("/distribute/:productId",validateProductId(),controller.distributeProduct)
router.patch("/cancel-distribute/:productId",validateProductId(),controller.deleteDistributorDetails)


export default router;