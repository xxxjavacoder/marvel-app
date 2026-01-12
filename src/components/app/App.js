import './App.scss';

import Header from '../appHeader/Header';
import CharList from '../charList/charList';
import CharInfo from '../charInfo/charInfo';

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
