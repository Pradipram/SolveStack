import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import App from './App';

import { UserContextProvider } from './context/userContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserContextProvider>
      <App />
    </UserContextProvider>
  </React.StrictMode>
);

// Hide the preloader once React is rendered
window.addEventListener('load', () => {
  const preloader = document.querySelector('.preloader');
  if (preloader) {
    preloader.style.display = 'none';
  }
});