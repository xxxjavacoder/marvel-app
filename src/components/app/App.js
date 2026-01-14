import './App.scss';

import Header from '../appHeader/Header';
import CharList from '../charList/CharList';
import CharInfo from '../charInfo/CharInfo';

function App() {
  return (
    <div className="App">
        <Header/>
        <div className="char__content">
            <CharList/>
            <CharInfo/>
        </div>
    </div>
  );
}

export default App;
