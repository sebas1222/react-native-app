import { DocumentNode, MutationHookOptions, useMutation } from '@apollo/client';
import { RootReducerTypes } from '@interfaces/index';
import { useSelector } from 'react-redux';

export const useMutationAction = (mutationType: DocumentNode, options?: MutationHookOptions) => {
  const { authToken } = useSelector((state: RootReducerTypes) => state.auth);
  const [mutationFn, { data, error, loading }] = useMutation(mutationType, {
    context: {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    },
    ...options,
  });
  return { mutationFn, data, error, loading };
};
