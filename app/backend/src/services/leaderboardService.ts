import Teams from '../database/models/Teams';
import Matches from '../database/models/Matches';
import {
  teamClassification,
  sortClassification,
} from '../middlewares/leaderboardSetup';

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

// Só para o lint não reclamar
export const getAll = async () => {};
