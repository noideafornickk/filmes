import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ListaFavoritos from './index';

jest.mock('../../services/api', () => ({
  __esModule: true,
  FAVORITES_STORAGE_KEY: '@onfilmes'
}));

jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
    info: jest.fn()
  }
}));

describe('ListaFavoritos', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('mostra estado vazio quando não há favoritos', () => {
    render(
      <MemoryRouter>
        <ListaFavoritos />
      </MemoryRouter>
    );

    expect(screen.getByText('Sua lista está vazia.')).toBeInTheDocument();
  });

  it('remove filme da lista e atualiza localStorage', async () => {
    localStorage.setItem(
      '@onfilmes',
      JSON.stringify([
        { id: 1, title: 'Filme A' },
        { id: 2, title: 'Filme B' }
      ])
    );

    render(
      <MemoryRouter>
        <ListaFavoritos />
      </MemoryRouter>
    );

    const botoesExcluir = screen.getAllByRole('button', { name: 'Excluir' });
    fireEvent.click(botoesExcluir[0]);

    expect(screen.queryByText('Filme A')).not.toBeInTheDocument();
    expect(JSON.parse(localStorage.getItem('@onfilmes'))).toEqual([
      { id: 2, title: 'Filme B' }
    ]);
  });
});
