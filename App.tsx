import React from 'react';
import 'react-native-gesture-handler';
import AuthNavigator from '@navigations/AuthNavigator';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import store, { Persistor } from './src/redux/store/index';
import { PersistGate } from 'redux-persist/integration/react';

const client = new ApolloClient({
  uri: 'https://graphql-server-icook-production.up.railway.app/',
  cache: new InMemoryCache({
    typePolicies: {
      User: {
        keyFields: ['id'],
        fields: {
          following: {
            merge(existing, incoming) {
              return incoming;
            },
          },
          followers: {
            merge(existing, incoming) {
              return incoming;
            },
          },
        },
      },
    },
  }),
});

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={Persistor}>
        <ApolloProvider client={client}>
          <NavigationContainer>
            <AuthNavigator />
          </NavigationContainer>
        </ApolloProvider>
      </PersistGate>
    </Provider>
  );
};
export default App;
