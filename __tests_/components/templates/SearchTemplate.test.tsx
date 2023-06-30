import React from 'react';
import {fireEvent, render, screen, waitFor} from '@testing-library/react-native';
import configureStore from 'redux-mock-store'; //ES6 modules
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { MockedProvider } from '@apollo/client/testing';
import SearchTemplate from '@templates/SearchTemplate';
import { GET_ALL_RECIPES } from '@api/queries';

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
            {
                id: 'RecetaTestID2',
                name: 'Receta Test 2',
                description: 'Una receta que es test',
                duration: 10,
                images: [],
                author: {
                  id: 'test2',
                  name: 'Autor test',
                },
                category: {
                  id: 'test2',
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
  ]; //
const recipesData = [
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
    {
        id: 'RecetaTestID2',
        name: 'Receta Hola 2',
        description: 'Una receta que es test',
        duration: 10,
        images: [],
        author: {
          id: 'test2',
          name: 'Autor test',
        },
        category: {
          id: 'test2',
          name: 'Category test',
        },
        ingredients: ['potato', 'onion'],
        steps: [
          { description: 'cortar potato', step_number: 1 },
          { description: 'hervir potato', step_number: 2 },
        ],
        likes: [],
      },
    ];
const categoriesData = [{
    id: 'id1',
    name: 'pastas'
},
{
    id: 'id2',
    name: 'vegetariana'
}];
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

describe('<SearchTemplate/>', () => {
    // En esta prueba buscamos las recetas con la palabra clave "Hola" y verificamso
    // que existe una receta con el nombre "Receta Hola 2"
    it('Renderiza el UI esperado cuando la data esta habilitada', async () => {
      const { queryByText } = render(
        <NavigationContainer>
          <Provider store={store}>
            <MockedProvider mocks={mocks}>
              <SearchTemplate recipesData={recipesData} categoriesData={categoriesData} />
            </MockedProvider>
          </Provider>
        </NavigationContainer>
      );
      await waitFor(() => {
        fireEvent.changeText(screen.getByPlaceholderText('¿Qué se te antoja hoy?'), 'Hola');
        console.log("Buscando una receta");
        //verificar que se renderiza una receta
        const recipeText = queryByText('Receta Hola 2');
        console.log("Aqui ta: ", recipeText);
        expect(recipeText).toBeTruthy();
      });
    });


    // En esta prueba, buscamos recetas con la palabra clave "Hola ascefsees", aqui verificamos
    // nos muestre el mensaje "No hay recetas que mostrar", ya que no existe ninguna receta con la palabra clave
    it('Renderiza el UI esperado cuando la data esta habilitada', async () => {
        const { queryByText } = render(
          <NavigationContainer>
            <Provider store={store}>
              <MockedProvider mocks={mocks}>
                <SearchTemplate recipesData={recipesData} categoriesData={categoriesData} />
              </MockedProvider>
            </Provider>
          </NavigationContainer>
        );
        await waitFor(() => {
          fireEvent.changeText(screen.getByPlaceholderText('¿Qué se te antoja hoy?'), 'Hola ascefsees');
          console.log("Buscando que no encuentre recetas");
          //verificar que se renderiza una receta
          const recipeText = queryByText('No hay recetas que mostrar');
          console.log("Mensaje de no hay receta: ", recipeText);
          expect(recipeText).toBeTruthy();
        });
      });
  });

