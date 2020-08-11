import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { UserProvider } from "./contexts/UserContext";
import * as serviceWorker from './serviceWorker';
import { CharacterProvider } from './contexts/CharacterContext';

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <CharacterProvider>
        <App />
      </CharacterProvider>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
