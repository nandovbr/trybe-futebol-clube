import { Router } from 'express';
import * as leaderboardController from '../controllers/leaderboardController';

const router = Router();

router.get('/home', leaderboardController.getHomeLeaderboard);
router.get('/away', leaderboardController.getAwayLeaderboard);

export default router;
