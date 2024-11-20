import { createRoot } from 'react-dom/client';
import './index.css';
import { App } from './App.jsx';
import { ProvideAppContext } from './context/AppContext.jsx';
import { Auth0Provider } from '@auth0/auth0-react';

const AUTH_DOMAIN = import.meta.env.VITE_AUTH_DOMAIN;
const AUTH_CLIENT_ID = import.meta.env.VITE_AUTH_CLIENT_ID;


/**
 * TODO: Ticket 3:
 * Implement authentication using Auth0:
 * - Wrap ProvideAppContext with the Auth Provider from Auth0
 * - Add your credentials from Auth0 to a .env file (AUTH_DOMAIN, AUTH_CLIENT_ID)
 * - Set the domain, clientId, and authorizationParams
 */
createRoot(document.getElementById('root')).render(
    <ProvideAppContext>
      <Auth0Provider
        // domain = {'dev-wid71u7s3fffit0y.us.auth0.com'}
        // clientId= {'jBDkcf8SCVIaNP4BqOw9Hm8zf8EEhrei'}
        // authorizationParams={{
        //   redirect_uri: 'http://localhost:5173/'
        // }}
        domain = {AUTH_DOMAIN}
        clientId= {AUTH_CLIENT_ID}
        authorizationParams={{
          redirect_uri: 'http://localhost:5173/'
        }}
      >
        <App />
      </Auth0Provider>
    </ProvideAppContext>
);
