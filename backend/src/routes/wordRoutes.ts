import express from 'express';
import * as wordController from '../controllers/wordController';

const router = express.Router();

router.get('/', wordController.getWords);
router.post('/', wordController.createWord);
router.get('/:wordId', wordController.getWord);
router.patch('/:wordId', wordController.updateWord);
router.delete('/:wordId', wordController.deleteWord);

export default router;
