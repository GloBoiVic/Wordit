import express from 'express';
import * as wordController from '../controllers/wordController';

const router = express.Router();

router.get('/', wordController.getWords);

router.get('/:wordId', wordController.getWord);

router.post('/', wordController.createWord);

router.patch('/:wordId', wordController.updateWord);

router.delete('/:wordId', wordController.deleteWord);

export default router;
