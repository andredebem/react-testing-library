import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';

const pokemonNameString = 'pokemon-name';

beforeEach(() => {
  const { getByText } = renderWithRouter(<App />);
  const moreDetailsButton = getByText('More details');
  userEvent.click(moreDetailsButton);
});

test('As informações detalhadas do Pokémon selecionado são mostradas na tela', () => {
  const namePokemon = screen.getByTestId(pokemonNameString).textContent;
  const { name, summary } = pokemons.find((pokemon) => pokemon.name === namePokemon);

  const detailsPokemonTitle = screen.queryByText(`${name} Details`);
  expect(detailsPokemonTitle).toBeTruthy(); // Em JavaScript, um valor truthy é um valor que se traduz em verdadeiro quando avaliado em um contexto Booleano. Todos os valores são truthy a menos que eles sejam definidos como falsy (ou seja., exceto para false, 0, "", null, undefined, e NaN).
  expect(detailsPokemonTitle).toBeInTheDocument();

  const moreDetailsButton = screen.queryByText('More details');
  expect(moreDetailsButton).toBeFalsy();

  const summaryPage = screen.queryByRole('heading', {
    level: 2,
    name: 'Summary',
  });
  expect(summaryPage).toBeTruthy();
  expect(summaryPage).toBeInTheDocument();

  const abstract = summaryPage.nextSibling;
  expect(abstract).toBeTruthy();
  expect(abstract.tagName.toLowerCase()).toBe('p');
  expect(abstract.textContent).toBe(summary);
});

test('Existe uma seção com os mapas contendo as localizações do pokémon', () => {
  const namePokemon = screen.getByTestId(pokemonNameString).textContent;
  const { name, foundAt } = pokemons.find((pokemon) => pokemon.name === namePokemon);

  const locationsTitle = screen.queryByRole('heading', {
    level: 2,
    name: `Game Locations of ${name}`,
  });
  expect(locationsTitle).toBeTruthy();
  expect(locationsTitle).toBeInTheDocument();

  const locationsPage = screen.queryAllByAltText(`${name} location`);
  expect(locationsPage).toHaveLength(foundAt.length);

  locationsPage.forEach((loc) => {
    const locName = loc.nextSibling.textContent;
    const nameResult = foundAt.some(({ location }) => locName === location);
    expect(nameResult).toBeTruthy();
    const locSource = loc.src;
    const srcResult = foundAt.some(({ map }) => locSource === map);
    expect(srcResult).toBeTruthy();
  });
});

test('O usuário pode favoritar um pokémon através da página de detalhe', () => {
  const labelCheckbox = screen.getByLabelText('Pokémon favoritado?');
  expect(labelCheckbox).toBeInTheDocument();
  expect(labelCheckbox.type).toBe('checkbox');

  const namePokemon = screen.getByTestId(pokemonNameString).textContent;
  const { name } = pokemons.find((pokemon) => pokemon.name === namePokemon);

  userEvent.click(labelCheckbox);
  let stair = screen.queryByAltText(`${name} is marked as favorite`);
  expect(stair).toBeTruthy();
  userEvent.click(labelCheckbox);
  stair = screen.queryByAltText(`${name} is marked as favorite`);
  expect(stair).toBeFalsy();
});
