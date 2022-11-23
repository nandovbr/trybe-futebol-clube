import Users from '../database/models/User';

export const getUserByEmail = async (email: any) => {
  // constantes com mensagem de erro e busca do usuário no banco de dados
  const errorMessage = 'Incorrect email or password';
  const user = await Users.findOne({ where: { email } });
  // console.log('user: ', user);

  // verificações se existe o usuário
  if (!user) {
    return { code: 401, message: errorMessage };
  }

  return { user };
};

// Só para o lint não reclamar
export const getAll = async () => {};
