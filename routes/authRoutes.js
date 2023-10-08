import express, { Router } from "express";
import { validateLogin } from "../helpers/validateLogin.js";
import * as controller from '../controllers/authController.js'
const router = express.Router();



router.post("/login",validateLogin(), controller.login);


export default router;