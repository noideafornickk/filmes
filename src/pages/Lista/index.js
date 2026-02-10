import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import api, { FAVORITES_STORAGE_KEY, TMDB_API_KEY } from '../../services/api';
import './lista.css';

function Lista() {
  const [filme, setFilme] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function loadFilmes() {
      if (!TMDB_API_KEY) {
        setError('API key da TMDB não configurada. Defina REACT_APP_TMDB_API_KEY no ambiente.');
        setLoading(false);
        return;
      }

      try {
        const response = await api.get(`/movie/${id}`, {
          params: {
            api_key: TMDB_API_KEY,
            language: 'pt_BR'
          }
        });

        setFilme(response.data);
        setError('');
      } catch (requestError) {
        console.error('Erro ao buscar filme:', requestError);

        if (requestError?.response?.status === 404) {
          setError('Filme não encontrado.');
          return;
        }

        setError('Não foi possível carregar os detalhes do filme.');
      } finally {
        setLoading(false);
      }
    }

    loadFilmes();
  }, [id]);

  function salvar() {
    if (!filme?.id) {
      toast.error('Dados do filme indisponíveis.');
      return;
    }

    let filmesSalvos = [];

    try {
      const minhaLista = localStorage.getItem(FAVORITES_STORAGE_KEY);
      filmesSalvos = JSON.parse(minhaLista) || [];
    } catch (parseError) {
      console.error('Erro ao ler favoritos:', parseError);
      localStorage.removeItem(FAVORITES_STORAGE_KEY);
      toast.error('Sua lista local estava inválida e foi reiniciada.');
    }

    const hasFilme = filmesSalvos.some((filmeSalvo) => filmeSalvo.id === filme.id);

    if (hasFilme) {
      toast.info('Filme já cadastrado!');
      return;
    }

    filmesSalvos.push(filme);
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(filmesSalvos));
    toast.success('Filme salvo com sucesso!');
  }

  if (loading) {
    return (
      <div className="info-filme">
        <h1>Carregando...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="info-filme">
        <h1>Não foi possível abrir este filme</h1>
        <span>{error}</span>

        <div className="button-session">
          <button onClick={() => navigate(-1)}>Voltar</button>
          <Link className="button-link" to="/">Ir para início</Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="info-filme">
        <h1>{filme.title}</h1>
        <img
          src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`}
          alt={filme.title}
        />
        <h3>Sinopse</h3>
        <span>{filme.overview}</span>
        <strong>Avaliação: {filme.vote_average}/10</strong>
      </div>
      <div className="button-session">
        <button onClick={salvar}>Salvar</button>
        <a
          className="button-link"
          target="_blank"
          rel="noopener noreferrer"
          href={`https://youtube.com/results?search_query=${filme.title} trailer`}
        >
          Trailer
        </a>
      </div>
    </>
  );
}

export default Lista;
