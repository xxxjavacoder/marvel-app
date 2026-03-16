import {useEffect, useState} from 'react';
import useMarvelService from '../../services/MarvelServices';
import Spinner from '../spiner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './charList.scss';

function CharList(props = {onSelectChar: () => {}}) {

    const [chars, setChars] = useState([]);
    const [selectedChar, setSelectedChar] = useState(1);
    const [LoadingNew, setLoadingNew] = useState(false);
    const [offset, setOffset] = useState(0);
    const [endedList, setEndedList] = useState(false);

    const {getListOfCharacters, clearError, process, setProcess} = useMarvelService();

    useEffect(() => {
        loadChars(offset, true);
    }, []);

    const loadChars = (offset, initial) => {
        initial ? setLoadingNew(false) : setLoadingNew(true);
        clearError();
        getListOfCharacters(offset)
            .then(onCharsLoaded)
    }

    const onCharsLoaded = (newChars) => {
        if (newChars.length < 9) {
            setEndedList(true);
        }
        setChars( chars => [...chars, ...newChars]);
        setOffset(offset => offset + 9);
        setLoadingNew(false);
        setProcess('confirmed');
    }

    const selectChar = (id) => {
        props.onSelectChar(id);
        setSelectedChar(id);
    }

    const charViews = chars.map(
        char => <View char={char} key={char.id} selectChar={selectChar} selectedID={selectedChar}/>
    );

    const setContent = (process) => {
        switch (process) {
            case 'waiting':
                return <Spinner/>
            case 'loading':
                return LoadingNew ? charViews : <Spinner/>
            case 'error':
                return <ErrorMessage/>
            case 'confirmed':
                return charViews
            default:
                return <ErrorMessage/>
        }
    }

    return (
        <div className="char__list">
            <div className="char__grid">
                {setContent(process)}
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
