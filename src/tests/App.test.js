import React from 'react';
// import { render } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import userEvent from '@testing-library/user-event';

test('A página principal da Pokédex é renderizada ao carregar a URL: /', () => {
  const { getByText } = renderWithRouter(<App />);
  const home = getByText('Encountered pokémons');
  expect(home).toBeInTheDocument();
});

test('O topo da aplicação contém um conjunto fixo de links de navegação', () => {
  const { getByRole } = renderWithRouter(<App />);

  const homeLink = getByRole('link', {
    name: 'Home',
  });
  expect(homeLink).toBeInTheDocument();

  const aboutLink = getByRole('link', {
    name: 'About',
  });
  expect(aboutLink).toBeInTheDocument();

  const favLink = getByRole('link', {
    name: 'Favorite Pokémons',
  });
  expect(favLink).toBeInTheDocument();
});

test('Ao clicar no Home da barra de navegação é redirecionado para: /', () => {
  const { getByRole, history } = renderWithRouter(<App />);

  const homeLink = getByRole('link', {
    name: 'Home',
  });
  userEvent.click(homeLink);
  const pathname = history.location.pathname;
  expect(pathname).toBe('/');
});

test('Ao clicar no About da barra de navegação é redirecionado para: /about', () => {
  const { getByRole, history } = renderWithRouter(<App />);

  const aboutLink = getByRole('link', {
    name: 'About',
  });
  userEvent.click(aboutLink);
  const pathname = history.location.pathname;
  expect(pathname).toBe('/about');
});

test('Ao clicar no Fav. Pokémons da barra de nav. é redirecionado: /favorites', () => {
  const { getByRole, history } = renderWithRouter(<App />);

  const favLink = getByRole('link', {
    name: 'Favorite Pokémons',
  });
  userEvent.click(favLink);
  const pathname = history.location.pathname;
  expect(pathname).toBe('/favorites');
});

test('É redirecionado para Not Found ao entrar em uma URL desconhecida', () => {
  const { getByText, history} = renderWithRouter(<App />);

  history.push('/notfound');
  const notFound = getByText(/Page requested not found/i);
  expect(notFound).toBeInTheDocument();
})
