import { Router } from 'express';
import * as matchController from '../controllers/matchController';
import { validToken } from '../middlewares/validMatches';
// import { validUserLogedMatch } from '../middlewares/validUserLogin';

const router = Router();

router.get('/', matchController.getAllMatches);
router.post('/', validToken, matchController.createMatch);
router.patch('/:id/finish', matchController.updateMatchProgress);

export default router;
