import express from 'express';
import { add, all, specific } from '../controllers/listingController.js';

const router = express.Router();

router.get('/', all);

router.get('/:id', specific);

router.post("/add",add);

export default router;
