import './App.scss';

import { Component } from 'react';
import Header from '../appHeader/Header';
import CharList from '../charList/CharList';
import CharInfo from '../charInfo/CharInfo';

class App extends Component {
    state = {
        selectedChar: null
    }

    onSelectChar = (id) => {
        this.setState({selectedChar: id})
    }

    render() {
        return (
            <div className="App">
                <Header/>
                <div className="char__content">
                  <CharList onSelectChar={this.onSelectChar} />
                  <CharInfo selectedChar={this.state.selectedChar} />
                </div>
            </div>
        );
    }
}

export default App;
