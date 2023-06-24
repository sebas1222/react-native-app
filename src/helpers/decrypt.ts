import { TokenObjectTypes } from '@interfaces/index';
import jwt_decode from 'jwt-decode';

export const decryptJWT = (token: string): TokenObjectTypes => {
  if (token) {
    const data: TokenObjectTypes = jwt_decode(token);
    return data;
  } else {
    return {
      _id: 'UserTest1',
      name: 'UserTest1',
      email: 'UserTest1',
      avatar: 'UserTest1',
      following: [],
      followers: [],
    };
  }
};
