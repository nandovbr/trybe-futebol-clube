import Teams from '../database/models/Teams';

export const getAllTeams = async () => {
  const teams = await Teams.findAll();
  // console.log('teams: ', teams);

  return teams;
};

export const getById = async (id: any) => {
  const team = await Teams.findByPk(id);
  // console.log('team: ', team);

  return team;
};

// Só para o lint não reclamar
export const getAll = async () => {};
