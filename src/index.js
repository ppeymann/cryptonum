import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import 'react-alice-carousel/lib/alice-carousel.css';
import CryptoContext from './context/cryptoContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <CryptoContext>
    <App />
    </CryptoContext>
  </BrowserRouter>
);

