import express from 'express';
import { userIndex, signUpPage, signup, signin, signout } from '../controller/user.controller.js';
import {body} from 'express-validator';
const router = express.Router();

router.get("/",userIndex);
router.get("/signup",signUpPage);
router.post("/signup",body('email','email is required').notEmpty(),
body('password','password is required').notEmpty(),signup)
router.post("/signin",signin);
router.post("/signout",signout);
export default router;