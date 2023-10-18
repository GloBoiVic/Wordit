import express from 'express';
import * as wordController from '../controllers/wordController';

const router = express.Router();

router.post('/', wordController.createWord);

export default router;
