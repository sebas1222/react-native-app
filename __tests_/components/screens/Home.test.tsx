import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import { MockedProvider } from '@apollo/client/testing';
import Home from '@screens/Home';
import { GET_ALL_CATEGORIES, GET_ALL_RECIPES } from '@api/queries';
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
jest.setTimeout(10000);
describe('<Home/>', () => {
  it('Renderiza el UI esperado cuando la data esta habilitada', async () => {
    const { queryByText } = render(
      <NavigationContainer>
        <MockedProvider mocks={mocks}>
          <Home />
        </MockedProvider>
      </NavigationContainer>
    );
    await waitFor(() => {
      //verificar que se renderiza una receta
      const recipeText = queryByText('Receta Test');
      const categoryText = queryByText('Category Test1');
      expect(recipeText).toBeTruthy();
      expect(categoryText).toBeTruthy();
      //verificar que se renderiza una categoria
    }
    );
  });
});
