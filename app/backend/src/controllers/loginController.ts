import { Request, Response } from 'express';
import { compareSync } from 'bcryptjs';
import * as loginServices from '../services/loginServices';
import { createToken } from '../middlewares/auth';

const errorMessage = 'Incorrect email or password';

export const userLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const { user } = await loginServices.getUserByEmail(email);

  if (!user) {
    return res.status(401).json({ message: errorMessage });
  }

  // Vou deixar assim por enqunato porque não está vindo o password do banco de dados para comparar
  const validPassword = compareSync(password, user.password);
  // console.log('validPassword: ', validPassword);

  // dificulta para o caso de alguma invasão não deixando claro se é usuário ou password inválidos.

  if (!validPassword) {
    return res.status(401).json({ message: errorMessage });
  }

  const token = createToken({ email });
  // console.log('token: ', token);

  if (!token) {
    return res.status(401).json({ message: errorMessage });
  }

  return res.status(200).json({ token });
};

export const validUserLoged = async (req: Request, res: Response) => {
  const { email } = req.body;
  const { user } = await loginServices.getUserByEmail(email);
  // console.log('user: ', user);

  if (!user) {
    return res.status(401).json({ message: errorMessage });
  }

  return res.status(200).json({ role: user.role });
};

// Encontrei essa forma de fazer a validação tendo como base o vídeo "O que é JWT e como utilizar em uma API em Express?"
// do canal Thi Code no youtube. https://www.youtube.com/watch?v=BBt7kHD4Pco
