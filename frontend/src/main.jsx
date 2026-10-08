import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { InternetIdentityProvider } from './context/InternetIdentityContext.jsx';
import App from './App';
import './styles/globals.css';
import './styles/registration.css';
import { IconBrandDocker, IconCloud } from '@tabler/icons-react';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <InternetIdentityProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </InternetIdentityProvider>
  </React.StrictMode>
)
