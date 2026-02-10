import { render, screen } from '@testing-library/react';
import RotasApp from './routes';
import api from './services/api';

jest.mock('./services/api', () => ({
  __esModule: true,
  default: {
    get: jest.fn()
  },
  TMDB_API_KEY: 'test-api-key',
  FAVORITES_STORAGE_KEY: '@onfilmes'
}));

describe('Rotas principais', () => {
  beforeEach(() => {
    localStorage.clear();
    window.location.hash = '#/';
    api.get.mockReset();
  });

  it('renderiza a home na rota raiz', async () => {
    api.get.mockResolvedValueOnce({
      data: { results: [] }
    });

    render(<RotasApp />);

    expect(await screen.findByText('Nenhum filme encontrado no momento.')).toBeInTheDocument();
    expect(api.get).toHaveBeenCalledTimes(1);
  });

  it('renderiza a lista de favoritos na rota /lista', () => {
    localStorage.setItem(
      '@onfilmes',
      JSON.stringify([{ id: 7, title: 'Filme Teste' }])
    );
    window.location.hash = '#/lista';

    render(<RotasApp />);

    expect(screen.getByRole('heading', { name: 'Meus favoritos' })).toBeInTheDocument();
    expect(screen.getByText('Filme Teste')).toBeInTheDocument();
  });

  it('renderiza a página 404 para rota inexistente', () => {
    window.location.hash = '#/nao-existe';

    render(<RotasApp />);

    expect(screen.getByText('Erro 404')).toBeInTheDocument();
  });
});
