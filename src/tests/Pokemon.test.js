import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';

const pokemonNameString = 'pokemon-name';
const moreDetailsString = 'More details';

test('É renderizado um card com as informações do pokémon', () => {
  const { getByTestId, getByAltText } = renderWithRouter(<App />);

  const namePokemon = getByTestId(pokemonNameString).textContent;
  const selectedPokemon = pokemons.find((pokemon) => pokemon.name === namePokemon);
  const { name, type, averageWeight, image } = selectedPokemon;
  expect(namePokemon).toBe(name);

  const typePokemon = getByTestId('pokemon-type').textContent;
  expect(typePokemon).toBe(type);

  const { value, measurementUnit } = averageWeight;
  const weightPokemonData = `Average weight: ${value} ${measurementUnit}`;
  const weightPokemon = getByTestId('pokemon-weight').textContent;
  expect(weightPokemon).toBe(weightPokemonData);

  const imagePokemon = getByAltText(`${name} sprite`);
  expect(imagePokemon.src).toBe(image);
});

test('O card contém um link com a URL: /pokemons/<id> para exibir mais detalhes', () => {
  const { getByText, getByTestId } = renderWithRouter(<App />);

  const namePokemon = getByTestId(pokemonNameString).textContent;
  const { id } = pokemons.find(({ name }) => name === namePokemon);

  const { href } = getByText(moreDetailsString);
  const result = href.endsWith(`/pokemons/${id}`);
  expect(result).toBeTruthy();
});

test('Ao clicar p/ ver mais detalhes, é direcionado p/ a página de detalhes', () => {
  const { getByText, getByTestId, queryByText } = renderWithRouter(<App />);

  const namePokemon = getByTestId(pokemonNameString).textContent;
  const { name } = pokemons.find((pokemon) => pokemon.name === namePokemon);

  const moreDetailsButton = getByText(moreDetailsString);
  userEvent.click(moreDetailsButton);

  const detailsPokemonTitle = queryByText(`${name} Details`);
  expect(detailsPokemonTitle).toBeTruthy(); // Em JavaScript, um valor truthy é um valor que se traduz em verdadeiro quando avaliado em um contexto Booleano. Todos os valores são truthy a menos que eles sejam definidos como falsy (ou seja., exceto para false, 0, "", null, undefined, e NaN).
  expect(detailsPokemonTitle).toBeInTheDocument();
});

test('A URL muda para: /pokemon/<id>, onde <id> é o id do Pokémon clicado', () => {
  const { getByText, getByTestId, history } = renderWithRouter(<App />);

  const namePokemon = getByTestId(pokemonNameString).textContent;
  const { id } = pokemons.find(({ name }) => name === namePokemon);

  const moreDetailsButton = getByText(moreDetailsString);
  userEvent.click(moreDetailsButton);

  const { location: { pathname } } = history;
  const linkData = `/pokemons/${id}`;
  expect(pathname).toBe(linkData);
});

test('Existe um ícone de estrela nos Pokémons favoritados', () => {
  const renderApp = renderWithRouter(<App />);
  const { getByText, getByTestId, getByLabelText, queryByAltText } = renderApp;

  const namePokemon = getByTestId(pokemonNameString).textContent;
  const { name } = pokemons.find((pokemon) => pokemon.name === namePokemon);

  const moreDetailsButton = getByText(moreDetailsString);
  userEvent.click(moreDetailsButton);

  const favCheck = getByLabelText('Pokémon favoritado?');
  userEvent.click(favCheck);

  const stair = queryByAltText(`${name} is marked as favorite`);
  expect(stair).toBeTruthy();
  const { src } = stair;
  const result = src.endsWith('/star-icon.svg');
  expect(result).toBeTruthy();
});
