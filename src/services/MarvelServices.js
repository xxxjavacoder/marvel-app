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

    return {loading, error, getAllCharacters, getCharacter, getListOfCharacters, clearError}
}

export default useMarvelServices;
