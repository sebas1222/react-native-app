import RCButton from '@atoms/RCButton';
import React from 'react';
import { RenderAPI, fireEvent, render } from '@testing-library/react-native';

describe('RCButton component', () => {
  // inicializamos el component con su tipado
  let component: RenderAPI;
  //se crea un mockHandler que nos permitira testear el evento onPress con esta función
  const mockHandler = jest.fn();
  // para evitar que en cada test se vuelva declarar el component mediante el render
  // se usa el beforeEach el cual es una funcion que se ejecutara antes de cada test
  // asi podremos trabajar directamente ya con el component en cada test
  beforeEach(() => {
    component = render(<RCButton onPress={mockHandler} />);
  });
  // se testea que el componente se renderize
  it('Se renderiza el RCButton', () => {
    expect(component).toBeDefined();
  });
  // se testea la prop onPress del componente con el mockHandler
  it('Ejecuta la acción onPress', () => {
    fireEvent.press(component.getByTestId('RCButton_touchable'));
    expect(mockHandler).toHaveBeenCalledTimes(1);
  });
});
