import { Router } from 'express';
import * as teamController from '../controllers/teamController';

const router = Router();

router.get('/', teamController.getAllTeams);
router.get('/:id', teamController.getById);

export default router;
