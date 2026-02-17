import {useEffect, useState} from 'react';
import MarvelService from '../../services/MarvelServices';
import Spiner from '../spiner/Spiner';
import ErrorMesaage from '../errorMessage/ErrorMesaage';

import './charList.scss';

function CharList(props = {onSelectChar: () => {}}) {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [chars, setChars] = useState([]);
    const [selectedChar, setSelectedChar] = useState(1);
    const [LoadingNew, setLoadingNew] = useState(false);
    const [offset, setOffset] = useState(0);
    const [endedList, setEndedList] = useState(false);

    const marvelService = new MarvelService();

    useEffect(() => {
        loadChars();
    }, []);

    const loadChars = (offset) => {
        onCharLoading();
        setLoading(true);
        setError(false);
        marvelService
            .getListOfCharacters(offset)
            .then(onCharsLoaded)
            .catch(onError)
    }

    const onCharLoading = () => {
       setLoadingNew(true);
    }

    const onCharsLoaded = (newChars) => {
        if (newChars.length < 9) {
            setEndedList(true);
        }
        setChars( chars => [...chars, ...newChars]);
        setOffset(offset => offset + 9);
        setLoading(false);
        setLoadingNew(false);
    }

    const onError = () => {
        setLoading(false);
        setError(true);
    }

    const selectChar = (id) => {
        props.onSelectChar(id);
        setSelectedChar(id);
    }

    const spinner = loading ? <Spiner/> : null;
    const errorMessage = error ? <ErrorMesaage/> : null;

    const charViews = chars.map(
        char => <View char={char} key={char.id} selectChar={selectChar} selectedID={selectedChar}/>
    );

    return (
        <div className="char__list">
            <div className="char__grid">
                {errorMessage}
                {spinner}
                {charViews}
            </div>
            <div style={{textAlign: 'center'}}>
                <button
                    className="btn btn-red mt-4"
                    onClick={() => loadChars(offset)} disabled={LoadingNew}
                    style={{display: endedList ? 'none' : 'inline-block'}}
                >
                    <div className="inner">load more</div>
                </button>
            </div>
        </div>
    )
}

const View = ({ char, selectChar, selectedID }) => {
    const { id, name, thumbnail } = char;
    const selected = id === selectedID;
    const className = selected ? 'char__item char__item_selected' : 'char__item';

    return (
        <div className={className} onClick={() => selectChar(id)}>
            <img src={thumbnail} alt={name} />
            <div className="char__name">{name}</div>
        </div>
    );
};

export default CharList;
