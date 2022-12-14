import Teams from '../database/models/Teams';
import Matches from '../database/models/Matches';
import {
  teamClassification,
  sortClassification,
} from '../middlewares/leaderboardSetup';
import {
  teamAwayClassification,
  sortAwayClassification,
} from '../middlewares/leaderboardAwaySetup';

export const getHomeLeaderboard = async () => {
  // salva na variável as partidas encerradas
  const teams = await Teams.findAll({
    include: [{
      model: Matches,
      as: 'teamHome',
      where: { inProgress: false },
    }],
  });

  const response = teams.map((team) => teamClassification(team));
  const result = sortClassification(response);

  return result;
};

export const getAwayLeaderboard = async () => {
  // salva na variável as partidas encerradas
  const teams = await Teams.findAll({
    include: [{
      model: Matches,
      as: 'teamAway',
      where: { inProgress: false },
    }],
  });

  const response = teams.map((team) => teamAwayClassification(team));
  const result = sortAwayClassification(response);

  return result;
};

// Só para o lint não reclamar
export const getAll = async () => {};
