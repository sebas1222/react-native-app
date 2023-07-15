import React from 'react';
import { RenderAPI, fireEvent, render, screen, waitFor } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import AddRecipeTemplate from '@templates/AddRecipeTemplate';
import { MockedProvider } from '@apollo/client/testing';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store'; //ES6 modules
import { LOGIN_USER } from '@api/queries';


const categoriesData = [
  {
    id: 'id1',
    name: 'pastas',
  },
  {
    id: 'id2',
    name: 'vegetariana',
  },
  {
    id: 'id3',
    name: 'criolla',
  },
];

const user = {
    id: 'UserTest1',
    name: 'UserTest1',
    email: 'UserTest1@gmail.com',
    password: 'UserTest1',
    avatar: 'UserTest1',
    followers: [],
    following: [],
  };

const mock = [
    {
      request: {
        query: LOGIN_USER,
        variables: { credentials: { email: 'UserTest1@gmail.com', password: 'UserTest1' } },
      },
      result: {
        data: {
          loginUser: {
            authToken:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlVzZXJUZXN0MSIsIm5hbWUiOiJVc2VyVGVzdDEiLCJlbWFpbCI6IlVzZXJUZXN0MUBnbWFpbC5jb20iLCJhdmF0YXIiOiJVc2VyVGVzdDEiLCJwYXNzd29yZCI6IlVzZXJUZXN0MSIsImZvbGxvd2VycyI6W10sImZvbGxvd2luZyI6W119.nRMYPPRDNS4HvNWMriC0v42Nmk-7ZXNN1GtQTGaoHkk',
            userInfo: user,
          },
        },
      },
    },
  ];
const middlewares: any = [];
const mockStore = configureStore(middlewares);
const initialState = {
  // Se configura el token en un string vacio para el mock
  auth: {
    authToken: '',
  },
};
const store = mockStore(initialState);

describe('<AddRecipeProcess/>', () => {
  let component: RenderAPI;
  beforeEach(() => {
    component = render(
      <NavigationContainer>
        <Provider store={store}>
          <MockedProvider mocks={mock}>
            <AddRecipeTemplate categories={categoriesData} />
          </MockedProvider>
        </Provider>
      </NavigationContainer>
    );
  });

  // Test para verificar que se muestre la vista del primer paso para crear una reseta
  // En esta prueba validamos que exista el texto "Cooking Time!", como referencia
  // de que la vista del primer paso es la que se esta mostrando.

  it('Renderiza la vista del primer paso para crear nueva receta', async () => {
    const { queryByText } = component;
    await waitFor(() => {
      //verificar que se renderize la receta con el valor de la busqueda
      const recipeText = queryByText('Cooking Time!');
      expect(recipeText).toBeTruthy();
    });
  });

  // Test para verificar que se muestre la vista del segundo paso para crear una reseta
  // Llegamos a esta vista luego de realizar el primer paso
  // En esta prueba validamos que exista el texto "¿Qué receta crearemos hoy?", como referencia
  // de que la vista del segundo paso es la que se esta mostrando.

  it('Renderiza la vista segundo paso para crear nueva receta', async () => {
    const { queryByText } = component;
    await waitFor(() => {
      //verificar que se renderize la receta con el valor de la busqueda
      fireEvent.press(screen.getByText('Continuar'));
      const recipeText = queryByText('¿Qué receta crearemos hoy?');
      expect(recipeText).toBeTruthy();
    });
  });

  // Test para verificar que se muestre la vista del tercer paso para crear una reseta
  // Llegamos a esta vista luego de realizar el primer paso y el segundo paso
  // En esta prueba validamos que exista el texto "¿Cómo sera nuestra receta?", como referencia
  // de que la vista del tercer paso es la que se esta mostrando.

  it('Renderiza el tercer paso para crear nueva receta', async () => {
    const { queryByText } = component;
    await waitFor(() => {
      //verificar que se renderize la receta con el valor de la busqueda
      fireEvent.press(screen.getByText('Continuar'));
      fireEvent.changeText(screen.getByPlaceholderText('Mi receta'),'Causa');
      fireEvent.press(screen.getByText('Continuar'));
      const recipeText = queryByText('¿Cómo sera nuestra receta?');
      expect(recipeText).toBeTruthy();
    });
  });

  // Test para verificar que se muestre la vista del tercer paso para crear una reseta
  // Llegamos a esta vista luego de realizar el primer paso, el segundo paso y el tercero
  // En esta prueba validamos que exista el texto "La categoría", como referencia
  // de que la vista del cuarto paso es la que se esta mostrando.

  it('Renderiza el cuarto paso para crear nueva receta', async () => {
    const { queryByText } = component;
    await waitFor(() => {
      //verificar que se renderize la receta con el valor de la busqueda
      fireEvent.press(screen.getByText('Continuar'));
      fireEvent.changeText(screen.getByPlaceholderText('Mi receta'),'Causa');
      fireEvent.press(screen.getByText('Continuar'));
      fireEvent.changeText(screen.getByPlaceholderText('Mi receta la mejor del mundo...'),'Muy rica <br/> Deliciona <br/> La mejor');
      fireEvent.press(screen.getByText('Continuar'));
      const recipeText = queryByText('La categoría');
      expect(recipeText).toBeTruthy();
    });
  });

});
