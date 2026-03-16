import {useEffect, useState} from 'react';
import useMarvelService from '../../services/MarvelServices';
import setContent from "../../utils/setContent";

import './randomChar.scss';

function RandomChar() {

    const [char, setChar] = useState({});

    const {getCharacter, clearError, process, setProcess} = useMarvelService();

    useEffect(() => {
        updateChar();
        const timerID = setInterval(updateChar, 60000);
        return () => clearInterval(timerID);
    }, [])

    const onCharLoaded = (newChar) => {
        setChar(newChar);
        setProcess('confirmed');
    }

    const updateChar = () => {
        clearError();
        const id = Math.floor(Math.random() * 20) + 1;
        getCharacter(id).then(onCharLoaded)
    }

    return (
        <div className="random-char">
            { setContent(process, View, char) }
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

const View = ({data}) => {
    const {name, description, thumbnail, homepage, wiki} = data;

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
