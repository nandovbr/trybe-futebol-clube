// import { Request, Response } from 'express';
import Teams from '../database/models/Teams';
import Matches from '../database/models/Matches';

export const getAllMatches = async () => {
  // traz os resultados de todos os jogos incluindo os nomes dos times
  // usando o alias na model Matches vindos da tabela Teams excluindo o id.
  const matches = await Matches.findAll({
    include: [
      { model: Teams, as: 'teamHome', attributes: { exclude: ['id'] } },
      { model: Teams, as: 'teamAway', attributes: { exclude: ['id'] } },
    ],
  });
  // console.log('matches: ', matches);

  return matches as Matches[];
};

export const getAllMatchesInProgress = async (inProgress: any) => {
  const matches = await Matches.findAll({
    where: { inProgress },
    include: [
      { model: Teams, as: 'teamHome', attributes: { exclude: ['id'] } },
      { model: Teams, as: 'teamAway', attributes: { exclude: ['id'] } },
    ],
  });

  return matches as Matches[];
};

export const createMatch = async (match: any) => {
  const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = match;

  const create = await Matches.create({
    homeTeam,
    awayTeam,
    homeTeamGoals,
    awayTeamGoals,
    inProgress: true,
  });


  return create;
};

export const finishedMatch = async (id: any) => {
  await Matches.update({ inProgress: false }, { where: { id } });

  return { message: 'Finished' };
};

export const editMatch = async (id: any, homeTeamGoals: any, awayTeamGoals: any) => {
  await Matches.update(
    { homeTeamGoals, awayTeamGoals },
    { where: { id } },
  );

  return { message: 'Match edited' };
};

export const getAllFinished = async () => {
  const matches = await Matches.findAll({
    where: { inProgress: false },
    include: [
      { model: Teams, as: 'teamHome', attributes: { exclude: ['id'] } },
      { model: Teams, as: 'teamAway', attributes: { exclude: ['id'] } },
    ],
  });

  return matches as Matches[];
};

// Só para o lint não reclamar
export const getAll = async () => {};
