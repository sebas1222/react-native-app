import { REGISTER_USER } from '@api/queries';
import { MockedProvider } from '@apollo/client/testing';
import configureStore from 'redux-mock-store'; //ES6 modules
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { RenderAPI, fireEvent, render, screen, waitFor } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import Register from '@screens/Register';

const user = {
  id: 'UserTest1',
  name: 'UserTest1',
  email: 'UserTest1@gmail.com',
  avatar: 'UserTest1',
  followers: [],
  following: [],
};

const mock = [
  {
    request: {
      query: REGISTER_USER,
      variables: {
        credentials: { email: 'UserTest1@gmail.com', name: 'UserTest1', password: 'UserTest1' },
      },
    },
    result: {
      data: {
        createUser: {
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

describe('<Register/>', () => {
  let component: RenderAPI;
  beforeEach(() => {
    component = render(
      <NavigationContainer>
        <Provider store={store}>
          <MockedProvider mocks={mock}>
            <Register />
          </MockedProvider>
        </Provider>
      </NavigationContainer>
    );
  });

  it('No permitir el registro si el campo "Nombre" esta vacío', async () => {
    const { queryByText } = component;
    await waitFor(() => {
      fireEvent.changeText(screen.getByPlaceholderText('Nombre'), '');
      fireEvent.changeText(screen.getByPlaceholderText('Email'), 'UserTest1@gmail.com');
      fireEvent.changeText(screen.getByPlaceholderText('Contraseña'), 'UserTest1');
      fireEvent.changeText(screen.getByPlaceholderText('Confirmar contraseña'), 'UserTest1');
      fireEvent.press(screen.getByText('Registrarme'));
      const missingName = queryByText('Porfavor digite su nombre');
      expect(missingName).toBeTruthy();
    });
  });
  it('No permitir el registro si el campo "Email" esta vacío', async () => {
    const { queryByText } = component;
    await waitFor(() => {
      fireEvent.changeText(screen.getByPlaceholderText('Nombre'), 'TestUser1');
      fireEvent.changeText(screen.getByPlaceholderText('Email'), '');
      fireEvent.changeText(screen.getByPlaceholderText('Contraseña'), 'UserTest1');
      fireEvent.changeText(screen.getByPlaceholderText('Confirmar contraseña'), 'UserTest1');
      fireEvent.press(screen.getByText('Registrarme'));
      const missingEmail = queryByText('Porfavor digite su email');
      expect(missingEmail).toBeTruthy();
    });
  });
  it('No permitir el registro si el campo "Contraseña" esta vacío', async () => {
    const { queryByText } = component;
    await waitFor(() => {
      fireEvent.changeText(screen.getByPlaceholderText('Nombre'), 'TestUser1');
      fireEvent.changeText(screen.getByPlaceholderText('Email'), 'UserTest1@gmail.com');
      fireEvent.changeText(screen.getByPlaceholderText('Contraseña'), '');
      fireEvent.changeText(screen.getByPlaceholderText('Confirmar contraseña'), 'UserTest1');
      fireEvent.press(screen.getByText('Registrarme'));
      const missingPassword = queryByText('Porfavor digite su contraseña');
      expect(missingPassword).toBeTruthy();
    });
  });
  it('No permitir el registro si los campos "Contraseña" y "Confirmar constraseña" no coinciden', async () => {
    const { queryByText } = component;
    await waitFor(() => {
      fireEvent.changeText(screen.getByPlaceholderText('Nombre'), 'TestUser1');
      fireEvent.changeText(screen.getByPlaceholderText('Email'), 'UserTest1@gmail.com');
      fireEvent.changeText(screen.getByPlaceholderText('Contraseña'), 'UserTest1');
      fireEvent.changeText(screen.getByPlaceholderText('Confirmar contraseña'), 'User');
      fireEvent.press(screen.getByText('Registrarme'));
      const dismatchPassword = queryByText('Las contraseñas deben coincidir');
      expect(dismatchPassword).toBeTruthy();
    });
  });
});
