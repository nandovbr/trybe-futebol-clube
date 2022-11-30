import { Request, Response } from 'express';
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

export const updateMatchProgress = async (id: number) => {
  const updateMatch = await Matches.update({ inProgress: false }, { where: { id } });

  return updateMatch;
};

export const verifyTeams = async (req: Request, res: Response) => {
  const { teamHome, teamAway } = req.body;
  const home = await Teams.findByPk(teamHome);
  const away = await Teams.findByPk(teamAway);

  if (teamHome === teamAway) {
    return res.status(422).json({
      message: 'It is not possible to create a match with two equal teams',
    });
  }

  if (!home || !away) {
    return res.status(404).json({ message: 'There is no team with such id!' });
  }
};

// Só para o lint não reclamar
export const getAll = async () => {};
