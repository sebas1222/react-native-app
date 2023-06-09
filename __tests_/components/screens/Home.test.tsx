import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import { MockedProvider } from '@apollo/client/testing';
import Home from '@screens/Home';
import { GET_ALL_CATEGORIES, GET_ALL_RECIPES, GET_ONE_USER } from '@api/queries';
import { NavigationContainer } from '@react-navigation/native';
import configureStore from 'redux-mock-store'; //ES6 modules
import { GraphQLError } from 'graphql';
import { Provider } from 'react-redux';

//Se hace los mocks para las pruebas exitosas
const mocks = [
  {
    request: {
      query: GET_ALL_RECIPES,
      variables: {},
      //agregar variables si es que se necesitan
    },
    result: {
      data: {
        allRecipes: [
          {
            id: 'RecetaTestID',
            name: 'Receta Test',
            description: 'Una receta que es test',
            duration: 10,
            images: [],
            author: {
              id: 'test1',
              name: 'Autor test',
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
  {
    request: {
      query: GET_ALL_CATEGORIES,
      variables: {},
    },
    result: {
      data: {
        allCategories: [
          {
            id: 'Category Test1',
            name: 'Category Test1',
          },
        ],
      },
    },
  },
  {
    request: {
      query: GET_ONE_USER,
      variables: { idUser: 'UserTest1' },
    },
    result: {
      data: {
        findUser: {
          id: 'UserTest1',
          name: 'User Test1',
          email: 'User Test1',
          avatar: 'User Test1',
          following: [],
          followers: [],
        },
      },
    },
  },
]; //

//Se hace el mock para las pruebas a fallar
const mockErrors = [
  {
    request: {
      query: GET_ALL_RECIPES,
      variables: {},
      //agregar variables si es que se necesitan
    },
    result: {
      errors: [new GraphQLError('Error al obtener las recetas!')],
    },
  },
  {
    request: {
      query: GET_ALL_CATEGORIES,
      variables: {},
    },
    result: {
      errors: [new GraphQLError('Error al obtener las categorias!')],
    },
  },
  {
    request: {
      query: GET_ONE_USER,
      variables: { idUser: 'UserTest1' },
    },
    result: {
      errors: [new GraphQLError('Error al obtener la data del usuario!')],
    },
  },
];
jest.setTimeout(10000);

// Ya que se esta testeando un componente es necesario tambien mockear
// la logica de navegación  en el caso con react navigation y la logica del estado global que guarda el token de usuario
// con redux

//se configura algunas opciones del redux
const middlewares: any = [];
const mockStore = configureStore(middlewares);
const initialState = {
  // Se configura el token en un string vacio para el mock
  auth: {
    authToken: '',
  },
};
const store = mockStore(initialState);

describe('<Home/>', () => {
  it('Renderiza el UI esperado cuando la data esta habilitada', async () => {
    const { queryByText } = render(
      <NavigationContainer>
        <Provider store={store}>
          <MockedProvider mocks={mocks}>
            <Home />
          </MockedProvider>
        </Provider>
      </NavigationContainer>
    );
    await waitFor(() => {
      //verificar que se renderiza una receta
      const recipeText = queryByText('Receta Test');
      const categoryText = queryByText('Category Test1');
      expect(recipeText).toBeTruthy();
      expect(categoryText).toBeTruthy();
      //verificar que se renderiza una categoria
    });
  });
  it('Se muestra el mensaje de error en la pantalla cuando ocurre un error', async () => {
    const { queryByText } = render(
      <NavigationContainer>
        <Provider store={store}>
          <MockedProvider mocks={mockErrors}>
            <Home />
          </MockedProvider>
        </Provider>
      </NavigationContainer>
    );
    await waitFor(() => {
      // verificar que se imprima el mensaje de error que traera el GraphQLError
      const errorText = queryByText('Error al obtener las recetas!');
      expect(errorText).toBeTruthy();
    });
  });
});
