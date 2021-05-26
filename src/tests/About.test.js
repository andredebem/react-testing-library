import React from 'react';
import renderWithRouter from '../renderWithRouter';
import About from '../components/About';

test('A página contém as informações sobre a Pokédex', () => {
  const { getByText } = renderWithRouter(<About />);

  const info = getByText(/a digital encyclopedia containing all Pokémons/i);
  expect(info).toBeInTheDocument();
});

test('A página contém um heading h2 com o texto "About Pokédex" ', () => {
  const { getByRole } = renderWithRouter(<About />);

  const title = getByRole('heading', {
    name: 'About Pokédex',
    level: 2,
  });
  expect(title).toBeInTheDocument();
});

test('A página contém dois parágrafos com texto sobre a Pokédex', () => {
  const { getAllByText } = renderWithRouter(<About />);

  const p = getAllByText(/Pokémons/i);
  expect(p).toHaveLength(2);
});

test('A página contém a imagem correta de uma Pokédex', () => {
  const { getByAltText } = renderWithRouter(<About />);

  const image = getByAltText('Pokédex');
  const source = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
  expect(image.src).toBe(source);
});
