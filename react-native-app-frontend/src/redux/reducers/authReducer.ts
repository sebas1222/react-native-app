import { AuthStateTypes } from '@interfaces/index';
import { SET_TOKEN } from '../types';

const authInitialState: AuthStateTypes = {
  authToken: '',
};

export default function authReducer(state = authInitialState, action: any): AuthStateTypes {
  switch (action.type) {
    case SET_TOKEN: {
      return {
        authToken: action.payload,
      };
    }
    default:
      return state;
  }
}
