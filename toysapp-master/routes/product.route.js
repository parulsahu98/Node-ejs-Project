import express from 'express';
import { list, save, saveProduct,getProductByCategoryId } from '../controller/product.controller.js';
import multer from 'multer';
import { body } from 'express-validator';
import { isVerified } from '../middleware/authenticate.js';
const upload = multer({dest: 'public/images'});
const router = express.Router();
router.route("/save")
.get(saveProduct)
.post(upload.single('productImage'),
body('productName','please enter product name').notEmpty(),
body('productPrice','please enter product price').notEmpty(),
body('productPrice','only digit is allowed').isNumeric(),
body('productQty','only digit is allowed').isNumeric(),
body('productQty','please enter product quantity').notEmpty(),save);

router.get("/list",list);
router.get("/:categoryId",isVerified,getProductByCategoryId);
export default router;