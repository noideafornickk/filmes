import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api, { TMDB_API_KEY } from '../../services/api';
import './home.css';

function Home() {
  const [filmes, setFilmes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadFilmes() {
      if (!TMDB_API_KEY) {
        setError('API key da TMDB não configurada. Defina REACT_APP_TMDB_API_KEY no ambiente.');
        setLoading(false);
        return;
      }

      try {
        const response = await api.get('movie/now_playing', {
          params: {
            api_key: TMDB_API_KEY,
            language: 'pt_BR',
            page: 1
          }
        });

        setFilmes(response.data.results || []);
        setError('');
      } catch (requestError) {
        console.error('Erro ao buscar filmes:', requestError);
        setError('Não foi possível carregar os filmes no momento. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    }

    loadFilmes();
  }, []);

  if (loading) {
    return (
      <div className="carregar">
        <h2>Carregando lista de filmes...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="feedback">
        <h2>{error}</h2>
      </div>
    );
  }

  if (filmes.length === 0) {
    return (
      <div className="feedback">
        <h2>Nenhum filme encontrado no momento.</h2>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="list-filmes">
        {filmes.map((filme) => (
          <article key={filme.id}>
            <strong>{filme.title}</strong>
            <img
              src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`}
              alt={filme.title}
            />
            <Link to={`/filme/${filme.id}`}>Acessar</Link>
          </article>
        ))}
      </div>
    </div>
  );
}

export default Home;
