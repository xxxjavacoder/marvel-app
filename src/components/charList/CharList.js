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

    onError = () => {
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
        const spinner = loading ? <Spiner/> : null;
        const errorMessage = error ? <ErrorMesaage/> : null;

        const charViews = chars.map(
            char => <View char={char} key={char.id} onSelectChar={this.props.onSelectChar} />
        );

        return (
            <div className="char__list">
                <div className="char__grid">
                    {errorMessage}
                    {spinner}
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

const View = ({ char, onSelectChar }) => {
    const { id, name, thumbnail } = char;

    return (
        <div className="char__item" onClick={() => onSelectChar(id)}>
            <img src={thumbnail} alt={name} />
            <div className="char__name">{name}</div>
        </div>
    );
};

export default CharList;
