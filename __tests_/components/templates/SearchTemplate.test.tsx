import React from 'react';
import { RenderAPI, fireEvent, render, screen, waitFor } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import SearchTemplate from '@templates/SearchTemplate';

const recipesData = [
  {
    id: 'RecetaTestID',
    name: 'Receta Test',
    description: 'Una receta que es test',
    duration: 25,
    images: [],
    author: {
      id: 'test1',
      name: 'Autor test',
    },
    category: {
      id: 'id2',
      name: 'vegetariana',
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
    name: 'Receta Test2',
    description: 'Una receta que es test',
    duration: 50,
    images: [],
    author: {
      id: 'test2',
      name: 'Autor test',
    },
    category: {
      id: 'id1',
      name: 'pastas',
    },
    ingredients: ['potato', 'onion'],
    steps: [
      { description: 'cortar potato', step_number: 1 },
      { description: 'hervir potato', step_number: 2 },
    ],
    likes: [],
  },
];
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

describe('<SearchTemplate/>', () => {
  let component: RenderAPI;
  beforeEach(() => {
    component = render(
      <NavigationContainer>
        <SearchTemplate recipesData={recipesData} categoriesData={categoriesData} />
      </NavigationContainer>
    );
  });

  //TEST DEL INPUT SEGUN EL QUERY PARA EL CASO DE QUE EXISTA UNA RECETA CON EL VALOR DEL QUERY
  // En esta prueba buscamos las recetas con la palabra clave "Hola" y verificamos
  // que existe una receta con el nombre "Receta Test2"
  it('Renderiza las recetas esperadas con el valor de la busqueda en el input', async () => {
    const { queryByText } = component;
    await waitFor(() => {
      fireEvent.changeText(screen.getByPlaceholderText('¿Qué se te antoja hoy?'), 'Receta');
      //verificar que se renderize la receta con el valor de la busqueda
      const recipeText = queryByText('Receta Test2');
      expect(recipeText).toBeTruthy();
    });
  });

  //TEST DEL INPUT SEGUN EL QUERY PARA EL CASO DE QUE SE MUESTRE EL MENSAJE ESPERADO PARA CUANDO NO HAYA RECETAS QUE CUMPLAN EL VALOR DEL QUERY
  // En esta prueba, buscamos recetas con la palabra clave "Hola ascefsees" y verificamos
  // que nos muestre el mensaje "No hay recetas que mostrar", ya que no existe ninguna receta con el valor de la busqueda
  it('Muestra el mensaje de "No hay recetas que mostrar" cuando no hay resultados para el input y filtros', async () => {
    const { queryByText } = component;
    await waitFor(() => {
      fireEvent.changeText(screen.getByPlaceholderText('¿Qué se te antoja hoy?'), 'Hola ascefsees');
      //verificar que se renderize el mensaje para el caso de que no haya recetas que mostrar
      const recipeText = queryByText('No hay recetas que mostrar');
      expect(recipeText).toBeTruthy();
    });
  });

  // TEST DEL FILTRO POR CATEGORIA PARA EL CASO DE QUE NOS MUESTRES LAS RECETAS QUE SEAN DE LA CATEGORIA SELECCIONADA
  // En esta prueba, buscamos recetas con la categoria "pastas", aqui verificamos
  // que se muestre la receta "Receta Test2"
  it('Renderiza las recetas esperadas con el valor de la categoría seleccionada', async () => {
    const { queryByText } = component;
    await waitFor(() => {
      fireEvent.press(screen.getByText('Filtrar por categoría'));
      fireEvent.press(screen.getByText('pastas'));
      //verificar que se renderiza las recetas con la categoria seleccionada "pastas"
      const recipeText = queryByText('Receta Test2');
      expect(recipeText).toBeTruthy();
    });
  });
  //TEST DEL INPUT SEGUN EL QUERY PARA EL CASO DE QUE SE MUESTRE EL MENSAJE ESPERADO PARA CUANDO NO HAYA RECETAS CON EL VALOR DE LA CATEGORIA SELECCIONADA
  // En esta prueba, buscamos recetas con la categoria "criolla", aqui verificamos
  // nos muestre el mensaje "No hay recetas que mostrar", ya que no existe ninguna receta con la palabra clave
  it('Muestra el mensaje de "No hay recetas que mostrar" cuando no hay resultados para la categoría', async () => {
    const { queryByText } = component;
    await waitFor(() => {
      fireEvent.press(screen.getByText('Filtrar por categoría'));
      fireEvent.press(screen.getByText('criolla'));
      //verificar que se renderize el mensaje para el caso de que no haya recetas que mostrar
      const recipeText = queryByText('No hay recetas que mostrar');
      expect(recipeText).toBeTruthy();
    });
  });
  it('Renderiza las recetas esperadas con el valor del rango duración establecida', async () => {
    const { getByTestId, queryByText } = component;
    await waitFor(() => {
      const slider = getByTestId('input_duration');
      fireEvent(slider, 'valueChange', 30);
      const recipeText = queryByText('Receta Test');
      expect(recipeText).toBeTruthy();
    });
  });
  it('Muestra el mensaje "No hay recetas que mostrar" cuando no hay recetas con una duración dentro del rango establecido de duración', async () => {
    const { getByTestId, queryByText } = component;
    await waitFor(() => {
      const slider = getByTestId('input_duration');
      fireEvent(slider, 'valueChange', 20);
      console.log('RAAA', slider);
      const recipeText = queryByText('No hay recetas que mostrar');
      expect(recipeText).toBeTruthy();
    });
  });
});
