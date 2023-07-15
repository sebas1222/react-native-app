import React from 'react';
import { RenderAPI, fireEvent, render, screen, waitFor } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { MockedProvider } from '@apollo/client/testing';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store'; //ES6 modules
import { LOGIN_USER } from '@api/queries';
import UserPerfilTemplate from '@templates/UserPerfilTemplate';
import { RecipeTypes } from '@interfaces/index';


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

const recipes: RecipeTypes[] = [];

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
            <UserPerfilTemplate dataUser={user} dataRecipes={recipes} />
          </MockedProvider>
        </Provider>
      </NavigationContainer>
    );
  });

// TEST para el mensaje de error, cuando no existe ninguna receta creada por el usuario
// En esta prueba buscamos el mensaje de error "No hay recetas que mostrar" cuando 
// se tiene seleccionado el tab con el id "view-1"
  it('Renderiza las recetas que ha creado el usuario, en este caso no hay ninguna por ende renderiza un mensaje de error', async () => {
    const { queryByText } = component;
    await waitFor(() => {
      fireEvent.press(screen.getByTestId('view-1'));
      //verificar que se renderize la receta con el valor de la busqueda
      const recipeText = queryByText('No hay recetas que mostrar');
      expect(recipeText).toBeTruthy();
    });
  });

// TEST para el mensaje de error, cuando no existe ningun usuario
// al que el usuario haya indicado que le sigue
// En esta prueba buscamos el mensaje de error "No hay usuarios que mostrar" cuando 
// se tiene seleccionado el tab con el texto `Siguiendo (${user.following.length})`
// ${user.following.length} es el número de usuarios al que sigue

  it('Renderiza los usuarios a los que le sigue el perfil, en este caso no hay usuarios a quien sigue el perfil', async () => {
    const { queryByText } = component;
    await waitFor(() => {
      fireEvent.press(screen.getByText(`Siguiendo (${user.following.length})`));
      //verificar que se renderize la receta con el valor de la busqueda
      const recipeText = queryByText('No hay usuarios que mostrar');
      expect(recipeText).toBeTruthy();
    });
  });

// TEST para el mensaje de error, cuando no existe ningun seguidor
// En esta prueba buscamos el mensaje de error "No hay usuarios que mostrar" cuando 
// se tiene seleccionado el tab con el texto `Seguidores (${user.followers.length})`
// ${user.followers.length} es el número de seguidores

  it('Renderiza los usuarios seguidores de este perfil, en este caso no hay seguidores por ende renderiza un mensaje de error', async () => {
    const { queryByText } = component;
    await waitFor(() => {
      fireEvent.press(screen.getByText(`Seguidores (${user.followers.length})`));
      //verificar que se renderize la receta con el valor de la busqueda
      const recipeText = queryByText('No hay usuarios que mostrar');
      expect(recipeText).toBeTruthy();
    });
  });

});
