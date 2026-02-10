import { Link } from 'react-router-dom';
import './erro.css';

function Erro() {
  return (
    <div className="erro">
      <h1>Erro 404</h1>
      <h2>Ops! Não encontramos a página que você buscou.</h2>
      <Link to="/">Voltar para a lista de filmes</Link>
    </div>
  );
}

export default Erro;
