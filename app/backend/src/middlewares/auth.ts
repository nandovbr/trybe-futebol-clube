import jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'jwt_secret';

if (!JWT_SECRET) {
  const error = new Error();
  error.message = 'Token not found';
  throw error;
}

export const createToken = (email: any) => {
  const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: 2592000 }); // equivale á 30 dias convertido em segundos
  return token;
};

// Só para o lint não reclamar
export const getAll = async () => {};
