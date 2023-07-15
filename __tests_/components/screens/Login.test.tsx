import { LOGIN_USER } from '@api/queries';
import { MockedProvider } from '@apollo/client/testing';
import configureStore from 'redux-mock-store'; //ES6 modules
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { fireEvent, render, screen, waitFor } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import Login from '@screens/Login';

const user = {
  id: 'UserTest1',
  name: 'UserTest1',
  email: 'UserTest1@gmail.com',
  password: 'UserTest1',
  avatar: 'UserTest1',
  followers: [],
  following: [],
};

//mock no servira para definir los datos enviados (request)
//y aquellos datos que tenemos esperado como respuesta (result)

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

  //En este apartado se realizaran las validaciones
  //si el expect(missingName) se cumple, entonces no es valido
  
describe('<Login/>', () => {
  it('No permitir el inicio de sesión si el campo email esta vacío', async () => {
    const { queryByText } = render(
      <NavigationContainer>
        <Provider store={store}>
          <MockedProvider mocks={mock}>
            <Login />
          </MockedProvider>
        </Provider>
      </NavigationContainer>
    );
    await waitFor(() => {
      fireEvent.changeText(screen.getByPlaceholderText('Email'), '');
      fireEvent.changeText(screen.getByPlaceholderText('Contraseña'), 'UserTest1');
      fireEvent.press(screen.getByText('Iniciar Sesión'));
      const missingEmail = queryByText('Porfavor digite su email.');
      expect(missingEmail).toBeTruthy();
    });
  });
  it('No permitir el inicio de sesión si el campo contraseña esta vacío', async () => {
    const { queryByText } = render(
      <NavigationContainer>
        <Provider store={store}>
          <MockedProvider mocks={mock}>
            <Login />
          </MockedProvider>
        </Provider>
      </NavigationContainer>
    );
    await waitFor(() => {
      fireEvent.changeText(screen.getByPlaceholderText('Email'), 'UserTest1@gmail.com');
      fireEvent.changeText(screen.getByPlaceholderText('Contraseña'), '');
      fireEvent.press(screen.getByText('Iniciar Sesión'));
      const missingEmail = queryByText('Porfavor digite su contraseña.');
      expect(missingEmail).toBeTruthy();
    });
  });
});
