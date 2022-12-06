import { Request, Response } from 'express';
import * as matchService from '../services/matchService';
// import Matches from '../database/models/Matches';
// import Teams from '../database/models/Teams';

// Traz todas as mathces com inProgress === true || false
export const getAllMatches = async (req: Request, res: Response) => {
  const { inProgress } = req.query;
  const matchesProgress = inProgress === 'true';

  if (!inProgress) {
    const matches = await matchService.getAllMatches();
    return res.status(200).json(matches);
  }

  const matches = await matchService.getAllMatchesInProgress(matchesProgress);
  return res.status(200).json(matches);
};

export const createMatch = async (req: Request, res: Response) => {
  const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = req.body;

  const equal = 'It is not possible to create a match with two equal teams';

  if (homeTeam === awayTeam) {
    return res.status(400).json({ message: equal });
  }

  const newMatch = { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals };
  const createdMatch = await matchService.createMatch(newMatch);

  return res.status(201).json(createdMatch);
};

export const finishedMatch = async (req: Request, res: Response) => {
  const { id } = req.params;

  await matchService.finishedMatch(+id);

  return res.status(200).json({ message: 'Finished' });
};

export const editMatch = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { homeTeamGoals, awayTeamGoals } = req.body;

  const response = await matchService.editMatch(+id, +homeTeamGoals, +awayTeamGoals);

  return res.status(200).json(response);
};

// Só para o lint não reclamar
export const getAll = async () => {};
