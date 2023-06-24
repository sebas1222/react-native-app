import { GET_ONE_USER, GET_USER_RECIPES } from '@api/queries';
import { MockedProvider } from '@apollo/client/testing';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import UserPerfil from '@screens/UserPerfil';
import { GraphQLError } from 'graphql';
import { render, waitFor } from '@testing-library/react-native';
import configureStore from 'redux-mock-store'; //ES6 modules
import { Provider } from 'react-redux';

const mocks = [
  {
    request: {
      query: GET_ONE_USER,
      variables: {
        idUser: 'IdUserID',
      },
    },
    result: {
      data: {
        findUser: {
          id: 'UserTest1',
          name: 'UserTest1',
          email: 'UserTest1',
          avatar: 'UserTest1',
          following: [],
          followers: [],
        },
      },
    },
  },
  {
    request: {
      query: GET_USER_RECIPES,
      variables: {
        idUser: 'IdUserID',
      },
    },
    result: {
      data: {
        recipesByUser: [
          {
            id: 'RecetaTestID',
            name: 'Receta Test',
            description: 'Una receta que es test',
            duration: 10,
            images: [],
            author: {
              id: 'IdUserID',
              name: 'UserTest1',
            },
            category: {
              id: 'test1',
              name: 'Category test',
            },
            ingredients: ['potato', 'onion'],
            steps: [
              { description: 'cortar potato', step_number: 1 },
              { description: 'hervir potato', step_number: 2 },
            ],
            likes: [],
          },
        ],
      },
    },
  },
];

const mockErrors = [
  {
    request: {
      query: GET_ONE_USER,
      variables: {
        idUser: 'IdUserID',
      },
    },
    result: {
      errors: [new GraphQLError('Error al obtener la data del usuario')],
    },
  },
  {
    request: {
      query: GET_USER_RECIPES,
      variables: {
        idUser: 'IdUserID',
      },
      //agregar variables si es que se necesitan
    },
    result: {
      errors: [new GraphQLError('Error al obtener las recetas del usuario')],
    },
  },
];

// Ya que se esta testeando un componente es necesario tambien mockear
// la logica de navegación  en el caso con react navigation y la logica del estado global que guarda el token de usuario
// con redux

//se configura algunas opciones del redux

const Stack = createStackNavigator();
const middlewares: any = [];
const mockStore = configureStore(middlewares);
const initialState = {
  // Se configura el token en un string vacio para el mock
  auth: {
    authToken: '',
  },
};
const store = mockStore(initialState);

describe('<UserPerfil/>', () => {
  it('Renderiza el UI esperado cuando la data esta habilitada', async () => {
    const { queryByText } = render(
      <NavigationContainer>
        <Provider store={store}>
          <MockedProvider mocks={mocks}>
            <Stack.Navigator>
              <Stack.Screen
                name="UserPerfil"
                component={UserPerfil}
                initialParams={{ userId: 'IdUserID' }}
              />
            </Stack.Navigator>
          </MockedProvider>
        </Provider>
      </NavigationContainer>
    );
    await waitFor(() => {
      const userText = queryByText('UserTest1');
      const recipeText = queryByText('Receta Test');
      expect(userText).toBeTruthy();
      expect(recipeText).toBeTruthy();
    });
  });
  it('Se muestra el mensaje de error en la pantalla cuando ocurre un error', async () => {
    const { queryByText } = render(
      <NavigationContainer>
        <Provider store={store}>
          <MockedProvider mocks={mockErrors}>
            <Stack.Navigator>
              <Stack.Screen
                name="UserPerfil"
                component={UserPerfil}
                initialParams={{ userId: 'IdUserID' }}
              />
            </Stack.Navigator>
          </MockedProvider>
        </Provider>
      </NavigationContainer>
    );
    await waitFor(() => {
      const errorText = queryByText('Error al obtener la data del usuario');
      expect(errorText).toBeTruthy();
    });
  });
});
