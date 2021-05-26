import React from 'react';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import pokemons from '../data';

test('É exibido: "No favorite pokemon found", se a pessoa não tiver favoritos', () => {
  const { getByText } = renderWithRouter(<FavoritePokemons pokemons={ [] } />);

  const message = getByText('No favorite pokemon found');
  expect(message).toBeInTheDocument();
});

test('É exibido todos os cards de pokémons favoritados', () => {
  const { getAllByText } = renderWithRouter(<FavoritePokemons pokemons={ pokemons } />);

  const numPokemonFav = getAllByText('More details');
  expect(numPokemonFav).toHaveLength(pokemons.length);
});

test('Nenhum card de pokémon é exibido, se ele não estiver favoritado', () => {
  const { queryAllByText } = renderWithRouter(<FavoritePokemons pokemons={ [] } />);

  const numPokemonFav = queryAllByText('More details');
  expect(numPokemonFav).toHaveLength(0);
});
