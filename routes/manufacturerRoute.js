import express, { Router } from "express";
import * as controller from '../controllers/manufacturerController.js'

const router = express.Router();


//add-product
router.post("/add-product",controller.addProduct)


export default router;