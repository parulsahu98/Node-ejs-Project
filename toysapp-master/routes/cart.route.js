import express, { application } from 'express';
import { addToCart, cartItem, loadData } from '../controller/cart.controller.js';
import {isVerified } from '../middleware/authenticate.js';
const router  = express.Router();
router.get("/add-to-cart/:productId",isVerified,addToCart);

router.get("/cart-item",isVerified,cartItem);
router.get("/load-data",isVerified,loadData);

export default router;