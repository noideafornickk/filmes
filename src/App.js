import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RotasApp from './routes';

function App() {
  return (
    <div className="App">
      <ToastContainer autoClose={4000} position="top-right" />
      <RotasApp />
    </div>
  );
}

export default App;
