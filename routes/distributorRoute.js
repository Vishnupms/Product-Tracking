import express, { Router } from "express";
import * as controller from '../controllers/distributorController.js'
const router = express.Router();


//distribute-product
router.patch("/distribute/:productId",controller.distributeProduct)
router.patch("/cancel-distribute/:productId",controller.deleteDistributorDetails)


export default router;