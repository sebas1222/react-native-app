import { decryptJWT } from '@helpers/decrypt';
import { RootReducerTypes } from '@interfaces/index';
import { useSelector } from 'react-redux';

const useGetCurrentUser = () => {
  const { authToken } = useSelector((state: RootReducerTypes) => state.auth);
  const currentUser = decryptJWT(authToken);
  return currentUser;
};

export default useGetCurrentUser;
