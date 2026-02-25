import {useEffect, useState} from 'react';
import useMarvelService from '../../services/MarvelServices';
import {NavLink} from 'react-router-dom';

import './ComicsList.scss';
import Spinner from "../spiner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

function ComicsList() {
    const [comics, setComics] = useState([]);
    const [offset, setOffset] = useState(0);
    const [endedList, setEndedList] = useState(false);

    const {loading, error, getListOfComics, clearError} = useMarvelService();

    useEffect(() => {
        clearError();
        loadComics();
    }, []);

    const loadComics = () => {
        clearError();
        getListOfComics(offset)
            .then(onComicsLoaded);
    }

    const onComicsLoaded = (newComics) => {
        if (newComics.length < 8) {
            setEndedList(true);
        }
        setComics( comics => [...comics, ...newComics]);
        setOffset(offset => offset + 8);
    }

    const comicsView = comics.map(comic => <View comic={comic} key={comic.id}/>);
    const spinner = loading ? <Spinner /> : null;
    const errorMessage = error ? <ErrorMessage /> : null;

    return (
        <div className="comics">
            <div className="comics__list">
                <div className="comics__grid">
                    {errorMessage}
                    {spinner}
                    {comicsView}
                </div>
                <div style={{textAlign: 'center'}}>
                    <button
                        className="btn btn-red mt-4"
                        onClick={() => loadComics(offset)}
                        style={{display: endedList ? 'none' : 'inline-block'}}
                    >
                        <div className="inner">load more</div>
                    </button>
                </div>
            </div>
        </div>
    );
}

const View = ({comic, setComicID}) => {
    return (
        <NavLink to={`/comics/${comic.id}`}>
            <div className="comics__item">
                <img className="comics__item-img" src={comic.thumbnail} alt={comic.title}/>
                <div className="comics__item-name">{comic.title}</div>
                <div className="comics__item-descr">{comic.description}</div>
                <div className="comics__item-pages">{comic.pageCount} pages</div>
                <div className="comics__item-price">{comic.price}$</div>
            </div>
        </NavLink>
    )
}

export default ComicsList;
