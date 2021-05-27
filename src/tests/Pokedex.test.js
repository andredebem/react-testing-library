import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';

const nextPokeString = 'Próximo pokémon';
const pokeNameString = 'pokemon-name';

test('A página contém um heading h2 com o texto "Encountered pokémons" ', () => {
  const { getByRole } = renderWithRouter(<App />);

  const title = getByRole('heading', {
    level: 2,
    name: 'Encountered pokémons',
  });

  expect(title).toBeInTheDocument();
});

test('É exibido o próximo Pokémon quando o botão "Próximo pokémon" é clicado', () => {
  const { getByTestId, getByText } = renderWithRouter(<App />);

  const actualPokemon = () => {
    const name = getByTestId(pokeNameString).innerHTML;
    return name;
  };

  let currentPokeName = actualPokemon();
  const result = [];
  pokemons.filter(({ name }, index) => {
    if (currentPokeName === name) {
      result.push(index);
    }
    return false; // No caso de não ser positivo o if, ou seja, quando a função não encontra o pokémon dentro do filter é retornado o 'false', que não faz nada, pois não é atribuído a nenhuma variável.
  });

  const nextPokeButton = getByText(nextPokeString);
  userEvent.click(nextPokeButton);

  currentPokeName = actualPokemon();
  const lastPokeIndex = 9;
  const indexNextPoke = result[0] + 1;
  if (indexNextPoke > lastPokeIndex) {
    expect(currentPokeName).toBe(pokemons[0].name);
  } else {
    expect(currentPokeName).toBe(pokemons[indexNextPoke].name);
  }
});

test('É mostrado apenas um Pokémon por vez', () => {
  const { queryAllByTestId } = renderWithRouter(<App />);

  const occurrences = queryAllByTestId(pokeNameString);

  expect(occurrences).toHaveLength(1);
});

test('Os filtros da Pokédex funcionam', () => {
  const { getByRole, getByTestId } = renderWithRouter(<App />);

  const actualPokemon = () => {
    const name = getByTestId(pokeNameString).innerHTML;
    return name;
  };

  const fireButton = getByRole('button', {
    name: 'Fire',
  });
  userEvent.click(fireButton);
  const firePokemons = pokemons.filter(({ type }) => type === 'Fire');
  let currentPoke = actualPokemon();
  const resultFire = firePokemons.some(({ name }) => currentPoke === name);
  expect(resultFire).toBe(true);

  const psychicButton = getByRole('button', {
    name: 'Psychic',
  });
  userEvent.click(psychicButton);
  const psychicPokemons = pokemons.filter(({ type }) => type === 'Psychic');
  currentPoke = actualPokemon();
  const resultPsychic = psychicPokemons.some(({ name }) => currentPoke === name);
  expect(resultPsychic).toBe(true);
});

test('O botão de resetar o filtro funciona', () => {
  const { getByRole, getByTestId, getByText } = renderWithRouter(<App />);

  const actualPokemon = () => {
    const name = getByTestId(pokeNameString).innerHTML;
    return name;
  };

  const allButton = getByRole('button', {
    name: 'All',
  });
  userEvent.click(allButton);

  let currentPokemonName = actualPokemon();
  const result = [];
  pokemons.filter(({ name }, index) => {
    if (currentPokemonName === name) {
      result.push(index);
    }
    return false; // No caso de não ser positivo o if, ou seja, quando a função não encontra o pokémon dentro do filter é retornado o 'false', que não faz nada, pois não é atribuído a nenhuma variável.
  });

  const nextPokeButton = getByText(nextPokeString);
  userEvent.click(nextPokeButton);

  currentPokemonName = actualPokemon();
  const lastPokeIndex = 9;
  const indexNextPoke = result[0] + 1;
  if (indexNextPoke > lastPokeIndex) {
    expect(currentPokemonName).toBe(pokemons[0].name);
  } else {
    expect(currentPokemonName).toBe(pokemons[indexNextPoke].name);
  }
});

test('É criado, dinamicamente, um botão de filtro para cada tipo de Pokémon', () => {
  const { getByRole, getAllByTestId } = renderWithRouter(<App />);

  const filterButton = (type) => {
    const filter = getAllByTestId((content, element) => {
      const testId = 'pokemon-type-button';
      return element.textContent === type && content.includes(testId);
    });
    return filter;
  };

  const allButton = getByRole('button', {
    name: 'All',
  });
  expect(allButton).toBeInTheDocument();

  const fireButton = filterButton('Fire');
  expect(fireButton).toHaveLength(1);

  const psychicButton = filterButton('Psychic');
  expect(psychicButton).toHaveLength(1);

  const electricButton = filterButton('Electric');
  expect(electricButton).toHaveLength(1);

  const bugButton = filterButton('Bug');
  expect(bugButton).toHaveLength(1);

  const poisonButton = filterButton('Poison');
  expect(poisonButton).toHaveLength(1);

  const dragonButton = filterButton('Dragon');
  expect(dragonButton).toHaveLength(1);

  const normalButton = filterButton('Normal');
  expect(normalButton).toHaveLength(1);

  // const allButtonTypes = getAllByTestId('pokemon-type-button');
  // expect(allButtonTypes).toHaveLength(7);
  // Essa era outra maneira de resolver esse requisito, porém utilizando uma nova filtragem. Da maneira que fiz acima a filtragem já é feita na callback do getAllByTestId.
});

test(' "Próximo pokémon" deve ser desabilitado quando tiver um só pokémon', () => {
  const { getByRole } = renderWithRouter(<App />);

  const nextPokemonButton = () => {
    const button = getByRole('button', {
      name: nextPokeString,
    });
    return button;
  };
  const electricButton = getByRole('button', {
    name: 'Electric',
  });
  userEvent.click(electricButton);
  let buttonNextPoke = nextPokemonButton();
  expect(buttonNextPoke).toHaveAttribute('disabled');

  const bugButton = getByRole('button', {
    name: 'Bug',
  });
  userEvent.click(bugButton);
  buttonNextPoke = nextPokemonButton();
  expect(buttonNextPoke).toHaveAttribute('disabled');

  const poisonButton = getByRole('button', {
    name: 'Poison',
  });
  userEvent.click(poisonButton);
  buttonNextPoke = nextPokemonButton();
  expect(buttonNextPoke).toHaveAttribute('disabled');

  const normalButton = getByRole('button', {
    name: 'Normal',
  });
  userEvent.click(normalButton);
  buttonNextPoke = nextPokemonButton();
  expect(buttonNextPoke).toHaveAttribute('disabled');

  const dragonButton = getByRole('button', {
    name: 'Dragon',
  });
  userEvent.click(dragonButton);
  buttonNextPoke = nextPokemonButton();
  expect(buttonNextPoke).toHaveAttribute('disabled');
});
