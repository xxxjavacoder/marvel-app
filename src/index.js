import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/app/App';
import MarvelService from './services/MarvelServices';

const marvelService = new MarvelService();

marvelService.getAllCharacters().then(res => res.data.results.forEach(char => console.log(char)));
marvelService.getCharacter(5).then(res => console.log(res));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
