import { Request, Response } from 'express';
import * as teamService from '../services/teamService';

export const getAllTeams = async (_req: Request, res: Response) => {
  const teams = await teamService.getAllTeams();
  // console.log('teams: ', teams);

  return res.status(200).json(teams);
};

export const getById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const team = await teamService.getById(id);

  return res.status(200).json(team);
};

// Só para o lint não reclamar
export const getAll = async () => {};
