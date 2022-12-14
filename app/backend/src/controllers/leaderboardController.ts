import { Request, Response } from 'express';
import * as leaderboardService from '../services/leaderboardService';

export const getHomeLeaderboard = async (_req: Request, res: Response) => {
  const leaderboard = await leaderboardService.getHomeLeaderboard();

  res.status(200).json(leaderboard);
};

// Só para o lint não reclamar
export const getAll = async () => {};
