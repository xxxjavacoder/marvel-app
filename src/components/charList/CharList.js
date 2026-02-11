import {Component} from 'react';
import MarvelService from '../../services/MarvelServices';
import Spiner from '../spiner/Spiner';
import ErrorMesaage from '../errorMessage/ErrorMesaage';

import './charList.scss';

class CharList extends Component {

    state = {
        loading: true,
        error: false,
        chars: [],
        selectedChar: null,
        LoadingNew: false,
        offset: 0,
        endedList: false
    }

    marvelService = new MarvelService();

    componentDidMount() {
        if (this._loaded) return;
        this._loaded = true;
        this.loadChars();
        // Example error for show how to work with Error Boundary and ComponentDidCatch etc.
        // this.foo.bar = 0;
    }

    loadChars = (offset) => {
        this.onCharLoading();
        this.setState({loading: true, error: false});
        this.marvelService
            .getListOfCharacters(offset)
            .then(this.onCharsLoaded)
            .catch(this.onError)
    }

    onCharLoading = () => {
        this.setState({LoadingNew: true});
    }

    onCharsLoaded = (chars) => {
        if (chars.length < 9) {
            this.setState({endedList: true});
        }
        this.setState(prevState => ({
            chars: [...prevState.chars, ...chars],
            offset: prevState.offset + 9,
            loading: false,
            LoadingNew: false
        }))
    }

    onError = () => {
        this.setState({loading: false, error: true});
    }

    selectChar = (id) => {
        this.props.onSelectChar(id);
        this.setState({selectedChar: id});
    }

    render() {

        const {chars, loading, error,offset, LoadingNew, endedList} = this.state;
        const spinner = loading ? <Spiner/> : null;
        const errorMessage = error ? <ErrorMesaage/> : null;

        const charViews = chars.map(
            char => <View char={char} key={char.id} selectChar={this.selectChar} selectedID={this.state.selectedChar}/>
        );

        return (
            <div className="char__list">
                <div className="char__grid">
                    {errorMessage}
                    {spinner}
                    {charViews}
                </div>
                <div style={{textAlign: 'center'}}>
                    <button
                        className="btn btn-red mt-4"
                        onClick={() => this.loadChars(offset)} disabled={LoadingNew}
                        style={{display: endedList ? 'none' : 'inline-block'}}
                    >
                        <div className="inner">load more</div>
                    </button>
                </div>
            </div>
        )
    }
}

const View = ({ char, selectChar, selectedID }) => {
    const { id, name, thumbnail } = char;
    const selected = id === selectedID;
    const className = selected ? 'char__item char__item_selected' : 'char__item';

    return (
        <div className={className} onClick={() => selectChar(id)}>
            <img src={thumbnail} alt={name} />
            <div className="char__name">{name}</div>
        </div>
    );
};

export default CharList;
