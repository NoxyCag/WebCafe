import ReactDOM from 'react-dom/client';
import App from './App';
import { CartProvider } from './contexts/CartContext';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <CartProvider>
    <App />
  </CartProvider>
);
