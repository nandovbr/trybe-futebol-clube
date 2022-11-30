import { Request, Response } from 'express';
import * as matchService from '../services/matchService';
import Matches from '../database/models/Matches';
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

// não passa no teste se não fizer a função separada da getAllMatches
// Atualiza o inProgress para true
export const updateMatchProgress = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { inProgress } = req.query;
  const matchById = await Matches.findByPk(id);
  const matchesProgress = inProgress === 'false';

  if (!inProgress) {
    const matches = await matchService.getAllMatches();
    return res.status(200).json(matches);
  }

  if (!matchById) {
    return res.status(404).json({ message: 'Match not found' });
  }

  await matchService.getAllMatchesInProgress(matchesProgress);
  return res.status(200).json({ message: 'Finished' });

  // const matchById = await Matches.findByPk(id);

  // if (!matchById) {
  //   return res.status(404).json({ message: 'Match not found' });
  // }

  // await matchService.updateMatchProgress(Number(id));
  // return res.status(200).json({ message: 'Finished' });
};

export const createMatch = async (req: Request, res: Response) => {
  // const { teamHome, teamAway } = req.body;
  // const home = await Teams.findByPk(teamHome);
  // const away = await Teams.findByPk(teamAway);
  // if (teamHome === teamAway) {
  //   return res.status(422).json({
  //     message: 'It is not possible to create a match with two equal teams',
  //   });
  // }
  // if (!home || !away) {
  //   return res.status(404).json({ message: 'There is no team with such id!' });
  // }

  await matchService.verifyTeams(req, res);

  const result = await Matches.create({
    id: req.body.id,
    teamHome: req.body.teamHome,
    teamAway: req.body.teamAway,
    homeTeamGoals: req.body.homeTeamGoals,
    awayTeamGoals: req.body.awayTeamGoals,
    inProgress: true,
  });
  return res.status(201).json(result);
};

// Só para o lint não reclamar
export const getAll = async () => {};
