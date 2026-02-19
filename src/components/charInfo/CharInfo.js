import './charInfo.scss';

import {useEffect, useState} from 'react';
import Spinner from '../spiner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from "../../services/MarvelServices";
import PropTypes from 'prop-types';

function CharInfo(props) {
    const [char, setChar] = useState({
        comics: [],
    });
    const selectedChar = props.selectedChar;

    const {loading, error, getCharacter, clearError} = useMarvelService();

    useEffect(() => {
        loadChar(selectedChar);
    }, [selectedChar]);

    const onCharLoaded = (char) => {
        setChar(char);
    }

    const loadChar = (id) => {
        clearError();
        getCharacter(id)
            .then(onCharLoaded)
    }

    const spinner = loading ? <Spinner/> : null;
    const errorMessage = error ? <ErrorMessage/> : null;

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
