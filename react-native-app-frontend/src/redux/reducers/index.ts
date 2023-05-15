import authReducer from './authReducer';
import { RootReducerTypes } from '@interfaces/index';
import { combineReducers } from 'redux';

const rootReducer = combineReducers<RootReducerTypes>({
  auth: authReducer,
});

export default rootReducer;
