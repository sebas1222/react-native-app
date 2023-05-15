import { TokenObjectTypes } from '@interfaces/index';
import jwt_decode from 'jwt-decode';

export const decryptJWT = (token: string): TokenObjectTypes => {
  const data: TokenObjectTypes = jwt_decode(token);

  return data;
};
