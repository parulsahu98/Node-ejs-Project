import express from 'express';
import { save } from '../controller/order.controller.js';
import { isVerified } from '../middleware/authenticate.js'
const router = express.Router();

router.post("/save",isVerified,save);
export default router;