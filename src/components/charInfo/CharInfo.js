import './charInfo.scss';

import {useEffect, useState} from 'react';
import Spiner from '../spiner/Spiner';
import ErrorMesaage from '../errorMessage/ErrorMesaage';
import MarvelService from "../../services/MarvelServices";
import PropTypes from 'prop-types';

function CharInfo(props) {
    const [char, setChar] = useState({
        comics: [],
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const selectedChar = props.selectedChar;

    const marvelService = new MarvelService();

    useEffect(() => {
        loadChar(selectedChar);
    }, [selectedChar]);

    const onCharLoaded = (char) => {
        setChar(char);
        setLoading(false);
        setError(false);
    }

    const onError = () => {
        setLoading(false);
        setError(true);
    }

    const loadChar = (id) => {
        setLoading(true);
        setError(false);
        marvelService
            .getCharacter(id)
            .then(onCharLoaded)
            .catch(onError)
    }

    const spinner = loading ? <Spiner/> : null;
    const errorMessage = error ? <ErrorMesaage/> : null;

    const charView = loading || error ? null : <View char={char}/>;

    return (
        <div className="char__info">
            {errorMessage}
            {spinner}
            {charView}
        </div>
    )
}

const View = ({char}) => {
    const {name, description, thumbnail, comics, wiki, homepage} = char;
    return (
        <div>
            <div className="char__basics">
                <img src={thumbnail} alt="abyss"/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="btn btn-red" target="_blank" rel="noreferrer">
                            <div className="inner">HOMEPAGE</div>
                        </a>
                        <a href={wiki} className="btn btn-gray" target="_blank" rel="noreferrer">
                            <div className="inner">WIKI</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            {comics.length > 0 ? (
                <>
                    <div className="char__comics">Comics:</div>
                    <ul className="char__comics-list">
                        {comics.map((comic, i) => {
                            if (i > 10) return;
                            return (<li className="char__comics-item" key={comic}>{comic}</li>)
                        })}
                    </ul>
                </>
            ) : "This character has no comics yet."}
        </div>
    )
}

CharInfo.propTypes = {
    selectedChar: PropTypes.number.isRequired
}

export default CharInfo;
