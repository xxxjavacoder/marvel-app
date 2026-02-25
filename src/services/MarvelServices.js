import {useHttp} from "../hooks/http.hook";

const useMarvelServices = () => {
    const {request, loading, error, clearError} = useHttp();

    const _apiBaseUrl = 'https://marvel-server-zeta.vercel.app';
    const _apiKey = 'apikey=d4eecb0c66dedbfae4eab45d312fc1df';
    const _baseOffset = 0;

    const getAllCharacters = async () => {
        const res = await request(`${_apiBaseUrl}/characters?${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBaseUrl}/characters/${id}?&${_apiKey}`);
        return _transformCharacter(res?.data.results[0]);
    }

    const getListOfCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBaseUrl}/characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }

    const getListOfComics = async (offset = _baseOffset) => {
        const res = await request(`${_apiBaseUrl}/comics?limit=8&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformComics);
    }

    const getComic = async (id) => {
        const res = await request(`${_apiBaseUrl}/comics/${id}?&${_apiKey}`);
        return _transformComics(res?.data.results[0]);
    }

    const _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description,
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items.map(comic => comic)
        };
    }

    const _transformComics = (comic) => {
        return {
            id: comic.id,
            title: comic.title,
            pageCount: comic.pageCount,
            description: comic.description,
            thumbnail: comic.thumbnail.path + '.' + comic.thumbnail.extension,
            price: comic.prices[0].price
        };
    }

    return {loading, error, getAllCharacters, getCharacter, getListOfCharacters, clearError, getListOfComics, getComic}
}

export default useMarvelServices;
