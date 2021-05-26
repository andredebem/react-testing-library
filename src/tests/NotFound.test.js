import React from 'react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../components/NotFound';

test('A página contém um heading h2 com o texto "Page requested not found 😭" ', () => {
  const { getByRole, getByLabelText } = renderWithRouter(<NotFound />);

  const messageText = getByRole('heading', {
    level: 2,
    name: /Page requested not found/i,
  });
  const emoji = getByLabelText('Crying emoji');

  expect(messageText).toBeInTheDocument();
  expect(emoji).toBeInTheDocument();
});

test('Teste se página mostra a imagem correta', () => {
  const { getByAltText } = renderWithRouter(<NotFound />);

  const image = getByAltText('Pikachu crying because the page requested was not found');
  const source = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
  expect(image.src).toBe(source);
});
