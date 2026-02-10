import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FAVORITES_STORAGE_KEY } from '../../services/api';
import './favoritos.css';

function ListaFavoritos() {
  const [filmes, setFilmes] = useState([]);

  useEffect(() => {
    try {
      const minhaLista = localStorage.getItem(FAVORITES_STORAGE_KEY);
      setFilmes(JSON.parse(minhaLista) || []);
    } catch (parseError) {
      console.error('Erro ao carregar favoritos:', parseError);
      localStorage.removeItem(FAVORITES_STORAGE_KEY);
      setFilmes([]);
      toast.error('Não foi possível ler sua lista de favoritos.');
    }
  }, []);

  function excluir(id) {
    const todosFilmes = filmes.filter((item) => item.id !== id);
    setFilmes(todosFilmes);
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(todosFilmes));
    toast.success('Filme removido da lista.');
  }

  return (
    <div className="lista-filmes">
      <h1>Meus favoritos</h1>

      {filmes.length === 0 && <p className="lista-vazia">Sua lista está vazia.</p>}

      <ul>
        {filmes.map((item) => (
          <li key={item.id}>
            <span>{item.title}</span>

            <div>
              <Link to={`/filme/${item.id}`}>Detalhes do filme</Link>
              <button onClick={() => excluir(item.id)}>Excluir</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListaFavoritos;
