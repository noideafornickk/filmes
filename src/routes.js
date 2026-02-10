import { HashRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Header from './components/header';
import Lista from './pages/Lista';
import Erro from './pages/Erro';
import ListaFavoritos from './pages/ListaFavoritos';

function RotasApp() {
    return (
        <HashRouter>
            <Header />
            <Routes>
                <Route path="/" element={ <Home /> } />
                <Route path="/filme/:id" element={ <Lista /> } />
                <Route path="/lista" element={ <ListaFavoritos /> } />
                <Route path="*" element={ <Erro /> } />
            </Routes>
        </HashRouter>
    );
}

export default RotasApp;
