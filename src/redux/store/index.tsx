import { createStore } from 'redux';
import rootReducer from '../reducers';
import { persistStore } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import persistReducer from 'redux-persist/es/persistReducer';

export const config = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(config, rootReducer);
const store = createStore(persistedReducer);
const Persistor = persistStore(store);

export { Persistor };
export default store;
