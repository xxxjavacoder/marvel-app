import {Component} from 'react';
import MarvelService from '../../services/MarvelServices';
import Spiner from '../spiner/Spiner';
import ErrorMesaage from '../errorMessage/ErrorMesaage';

import './charList.scss';

class CharList extends Component {

    state = {
        loading: true,
        error: false,
        chars: []
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.loadChars();
    }

    onCharsLoaded = (chars) => {
        this.setState({chars, loading: false})
    }

    onError = (err) => {
        this.setState({loading: false, error: true});
    }

    loadChars = () => {
        const limit = 9;
        this.setState({loading: true, error: false});
        this.marvelService
            .getListOfCharacters(limit)
            .then(this.onCharsLoaded)
            .catch(this.onError)
    }

    render() {

        const {chars, loading, error} = this.state;
        const spiner = loading ? <Spiner/> : null;
        const errorMessage = error ? <ErrorMesaage/> : null;

        const charViews = chars.map(
            (char, index) => <View char={char} key={index + 1} />
        );

        return (
            <div className="char__list">
                <div className="char__grid">
                    {errorMessage}
                    {spiner}
                    {charViews}
                </div>
                <div style={{textAlign: 'center'}}>
                    <button className="btn btn-red mt-4">
                        <div className="inner">load more</div>
                    </button>
                </div>
            </div>
        )
    }
}

const View = ({char}, key) => {
    const {name, thumbnail} = char;

    return (
        <div className="char__item" key={key}>
            <img src={thumbnail} alt="name"/>
            <div className="char__name">{name}</div>
        </div>
    )
}

export default CharList;
