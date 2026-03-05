import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Helmet from 'react-helmet';

import useMarvelService from '../services/MarvelServices';
import Spinner from '../components/spiner/Spinner';
import ErrorMessage from '../components/errorMessage/ErrorMessage';
import './singlePage.scss';

const Single = () => {
    const {comicId} = useParams();
    const {characterId} = useParams();
    const [state, setState] = useState(null);
    const {loading, error, getComic, clearError, getCharacter} = useMarvelService();

    useEffect(() => {
        updateItem()
    }, [comicId, characterId])

    const updateItem = () => {
        clearError();
        if (comicId) {
            getComic(comicId)
                .then(onComicLoaded)
        }

        if (characterId) {
            getCharacter(characterId)
                .then(onCharLoaded)
        }
    }

    const onComicLoaded = (comic) => {
        setState(comic);
    }

    const onCharLoaded = (char) => {
        setState(char);
    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const comicContent = !(loading || error || !state) && comicId ? <ComicView item={state}/> : null;
    const charContent = !(loading || error || !state) && characterId ? <CharView item={state}/> : null;

    return (
        <>
            {errorMessage}
            {spinner}
            {comicContent}
            {charContent}
        </>
    )
}

const ComicView = ({item}) => {
    const {title, description, pageCount, thumbnail, language, price} = item;

    return (
        <>
            <Helmet>
                <meta name="content" content={`Page about comic: ${title}`} />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>{title}</title>
            </Helmet>
            <div className="single">
                <img src={thumbnail} alt={title} className="single__img"/>
                <div className="single__info">
                    <h2 className="single__name">{title}</h2>
                    <p className="single__descr">{description}</p>
                    <p className="single__descr">{pageCount}</p>
                    <p className="single__descr">Language: {language}</p>
                    <div className="single__price">{price}</div>
                </div>
                <Link to="/comics" className="single__back">Back to all</Link>
            </div>
        </>
    )
}

const CharView = ({item}) => {
    const {name, description, thumbnail, homepage, wiki} = item;

    return (
        <>
            <Helmet>
                <meta name="content" content={`Page about char: ${name}`} />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>{name}</title>
            </Helmet>
            <div className="single">
                <img src={thumbnail} alt={name} className="single__img"/>
                <div className="single__info">
                    <h2 className="single__name">{name}</h2>
                    <p className="single__descr">{description}</p>
                    <div className="single__buttons">
                        <a className="btn btn-red" href={homepage} target="_blank" rel="noopener noreferrer">
                            Homepage
                        </a>
                        <a className="btn btn-red" href={wiki} target="_blank" rel="noopener noreferrer">
                            Wiki
                        </a>
                    </div>
                </div>
                <Link to="/" className="single__back">Back to all</Link>
            </div>
        </>
    )
}

export default Single;