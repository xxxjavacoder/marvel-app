import './App.scss';

import { Component } from 'react';
import Header from '../appHeader/Header';
import CharList from '../charList/CharList';
import CharInfo from '../charInfo/CharInfo';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';

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
                    <ErrorBoundary>
                        <CharList onSelectChar={this.onSelectChar} />
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <CharInfo selectedChar={this.state.selectedChar} />
                    </ErrorBoundary>
                </div>
            </div>
        );
    }
}

export default App;
