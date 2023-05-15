import { SET_TOKEN } from '../types';

export const setToken = (token: string) => ({
  type: SET_TOKEN,
  payload: token,
});
