import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import { MockedProvider } from '@apollo/client/testing';
import { GET_ALL_CATEGORIES, GET_ALL_RECIPES } from '@api/queries';
import configureStore from 'redux-mock-store'; //ES6 modules
import { GraphQLError } from 'graphql';
import { Provider } from 'react-redux';
import Search from '@screens/Search';
import { NavigationContainer } from '@react-navigation/native';

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
]; //

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

describe('<Search/>', () => {
  it('Renderiza el UI esperado cuando la data esta habilitada', async () => {
    const { queryByText } = render(
      <NavigationContainer>
        <Provider store={store}>
          <MockedProvider mocks={mocks}>
            <Search />
          </MockedProvider>
        </Provider>
      </NavigationContainer>
    );
    await waitFor(() => {
      //verificar que se renderiza una receta
      const recipeText = queryByText('Receta Test');
      expect(recipeText).toBeTruthy();
    });
  });
  it('Se muestra el mensaje de error en la pantalla cuando ocurre un error', async () => {
    const { queryByText } = render(
      <NavigationContainer>
        <Provider store={store}>
          <MockedProvider mocks={mockErrors}>
            <Search />
          </MockedProvider>
        </Provider>
      </NavigationContainer>
    );
    await waitFor(() => {
      const errorText = queryByText('Error al obtener las recetas!');
      expect(errorText).toBeTruthy();
    });
  });
});
