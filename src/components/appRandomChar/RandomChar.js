import {useEffect, useState} from 'react';
import MarvelService from '../../services/MarvelServices';
import Spiner from '../spiner/Spiner';
import ErrorMesaage from '../errorMessage/ErrorMesaage';

import './randomChar.scss';

function RandomChar() {

    const [char, setChar] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const marvelService = new MarvelService();

    useEffect(() => {
        updateChar();
        const timerID = setInterval(updateChar, 10000);
        return () => clearInterval(timerID);
    }, [])

    const onCharLoaded = (newChar) => {
        setChar(newChar);
        setError(false);
        setLoading(false);
    }

    const onError = () => {
        setLoading(false);
        setError(true);
    }

    const updateChar = () => {
        const id = Math.floor(Math.random() * 21) + 1;
        setLoading(true);
        setError(false);
        marvelService
            .getCharacter(id)
            .then(onCharLoaded)
            .catch(onError)
    }

    const errorMessage = error ? <ErrorMesaage/> : null;
    const spiner = loading ? <Spiner/> : null;
    const charView = (!errorMessage && !spiner) ? <View char={char}/> : null;

    return (
        <div className="random-char">
            { errorMessage }
            { spiner }
            { charView }
            <div className="random-char__random">
                <div className="fz-24 fw-bold">
                    Random character for today!
                    Do you want to get to know him better?
                </div>
                <div className="fz-24 fw-bold mt-4">
                    Or choose another one
                </div>
                <button onClick={updateChar} className="btn btn-red mt-4">TRY IT</button>
            </div>
        </div>
    )
}

const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki} = char;

    return (
        <div className="random-char__hero">
            <img className="random-char__hero-img" src={thumbnail} alt="thor" />
            <div className="random-char__hero-wrapper">
                <div className="random-char__hero-title fw-bold fz-24">
                    { name }
                </div>
                <div className="random-char__hero-text">
                    { description }
                </div>
                <div className="random-char__hero-btns">
                    <a href={ homepage } className="btn btn-red" target="_blank" rel="noreferrer">
                        HOMEPAGE
                    </a>
                    <a href={ wiki } className="btn btn-gray" target="_blank" rel="noreferrer">
                        WIKI
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;
