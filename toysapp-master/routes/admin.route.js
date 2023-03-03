import express from 'express';
import { index } from '../controller/admin.controller.js';
const router = express.Router();
router.get("/",index);
export default router;