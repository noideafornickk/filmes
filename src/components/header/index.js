import { Link } from 'react-router-dom';
import './style.css';

function Header() {
  return (
    <header>
      <Link className="logo" to="/">Onfilmes</Link>
      <Link className="favoritos" to="/lista">Minha lista</Link>
    </header>
  );
}

export default Header;
