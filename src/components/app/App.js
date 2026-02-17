import './App.scss';

import { useState } from 'react';
import Header from '../appHeader/Header';
import CharList from '../charList/CharList';
import CharInfo from '../charInfo/CharInfo';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';

function App() {
    const [selectedChar, setSelectedChar] = useState(1)

    const onSelectChar = (id) => {
        setSelectedChar(id);
    }

    return (
        <div className="App">
            <Header/>
            <div className="char__content">
                <ErrorBoundary>
                    <CharList onSelectChar={onSelectChar} />
                </ErrorBoundary>
                <ErrorBoundary>
                    <CharInfo selectedChar={selectedChar} />
                </ErrorBoundary>
            </div>
        </div>
    );
}

export default App;
