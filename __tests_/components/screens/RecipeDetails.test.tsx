import { render, waitFor } from '@testing-library/react-native';
import React from 'react';
import { MockedProvider } from '@apollo/client/testing';
import { GET_ONE_RECIPE } from '@api/queries';
import { NavigationContainer } from '@react-navigation/native';
import RecipeDetails from '@screens/RecipeDetails';
import { createStackNavigator } from '@react-navigation/stack';

const mocks = [
  {
    request: {
      query: GET_ONE_RECIPE,
      variables: {
        idRecipe: 'RecetaTestID',
      },
      //agregar variables si es que se necesitan
    },
    result: {
      data: {
        findRecipe: {
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
      },
    },
  },
]; //

const Stack = createStackNavigator();

describe('<RecipeDetails/>', () => {
  it('Renderiza el UI esperado cuando la data esta habilitada', async () => {
    const { queryByText } = render(
      <NavigationContainer>
        <MockedProvider mocks={mocks}>
          <Stack.Navigator>
            <Stack.Screen
              name="RecipeDetails"
              component={RecipeDetails}
              initialParams={{ recipeId: 'RecetaTestID' }} // Proporcionar el recipeId como parámetro inicial
            />
          </Stack.Navigator>
        </MockedProvider>
      </NavigationContainer>
    );
    await waitFor(() => {
      //verificar que se renderiza la receta
      const recipeText = queryByText('Receta Test');
      expect(recipeText).toBeTruthy();
    });
  });
});
