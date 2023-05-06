import React from "react";
import "react-native-gesture-handler";
import AuthNavigator from "@navigations/AuthNavigator";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { NavigationContainer } from "@react-navigation/native";

const client = new ApolloClient({
  uri: "http://10.0.2.2:3000/",
  cache: new InMemoryCache({}),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <AuthNavigator />
      </NavigationContainer>
    </ApolloProvider>
  );
};
export default App;
