import { Router } from 'express';
import * as matchController from '../controllers/matchController';
import { validToken } from '../middlewares/validMatches';
// import { validUserLogedMatch } from '../middlewares/validUserLogin';

const router = Router();

router.get('/', matchController.getAllMatches);
router.post('/', validToken, matchController.createMatch);
router.patch('/:id', matchController.editMatch);
router.patch('/:id/finish', matchController.finishedMatch);

export default router;
