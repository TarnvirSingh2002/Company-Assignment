import express from 'express';
import { all, specific } from '../controllers/listingController.js';

const router = express.Router();

router.get('/', all);

router.get('/:id', specific);

export default router;
