import express, { Router } from "express";
import * as controller from '../controllers/distributorController.js'
const router = express.Router();


//distribute-product
router.put("/distribute/:productId",controller.distributeProduct)
router.put("/delete-distribute/:productId",controller.deleteDistributorDetails)


export default router;