import { useState } from 'react';
import CharList from '../components/charList/CharList';
import CharInfo from '../components/charInfo/CharInfo';
import ErrorBoundary from '../components/errorBoundary/ErrorBoundary';
import RandomChar from "../components/appRandomChar/RandomChar";

function Characters() {
    const [selectedChar, setSelectedChar] = useState(1)

    const onSelectChar = (id) => {
        setSelectedChar(id);
    }

    return (
        <div>
            <ErrorBoundary>
                <RandomChar/>
            </ErrorBoundary>
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

export default Characters;
