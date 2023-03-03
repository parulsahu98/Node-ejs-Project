import express from 'express';
import { addCategory, editCategory, list, remove, save, update } from '../controller/category.controller.js';
const router = express.Router();

// http://localhost:3000/category/add

router.route("/add")
.get(addCategory)
.post(save);

router.get("/list",list);
router.post('/update',update);
router.get("/delete/:id",remove);
router.get("/edit/:id",editCategory);
export default router;