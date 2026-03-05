import { useState } from 'react';
import CharList from '../components/charList/CharList';
import CharInfo from '../components/charInfo/CharInfo';
import CharForm from "../components/charForm/CharForm";
import ErrorBoundary from '../components/errorBoundary/ErrorBoundary';
import RandomChar from "../components/appRandomChar/RandomChar";
import {Helmet} from "react-helmet";

function Characters() {
    const [selectedChar, setSelectedChar] = useState(1)

    const onSelectChar = (id) => {
        setSelectedChar(id);
    }

    return (
        <div>
            <Helmet>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="content" title="Page with list of characters" />
                <title>Marvel app home page</title>
            </Helmet>
            <ErrorBoundary>
                <RandomChar/>
            </ErrorBoundary>
            <div className="char__content">
                <ErrorBoundary>
                    <CharList onSelectChar={onSelectChar} />
                </ErrorBoundary>
                <div>
                    <ErrorBoundary>
                        <CharInfo selectedChar={selectedChar} />
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <CharForm />
                    </ErrorBoundary>
                </div>
            </div>
        </div>
    );
}

export default Characters;
