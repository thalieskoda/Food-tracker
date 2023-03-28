import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import GlobalStyles from './components/GlobalStyles';
import {Auth0Provider} from "@auth0/auth0-react"
const domain = process.env.REACT_APP_AUTH0_DOMAIN
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID
const {REACT_APP_AUTH0_DOMAIN, REACT_APP_AUTH0_CLIENT_ID} = process.env
console.log(REACT_APP_AUTH0_CLIENT_ID);
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Auth0Provider
  domain={domain}
  clientId={clientId}
  redirect_uri={"/homefeed"}
  authorizationParams={{redirect_uri:window.location.origin}}
  >
    <GlobalStyles/>
    <App />
  </Auth0Provider>
);
