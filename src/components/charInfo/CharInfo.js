import './charInfo.scss';

import { Component } from 'react';
import Spiner from '../spiner/Spiner';
import ErrorMesaage from '../errorMessage/ErrorMesaage';
import MarvelService from "../../services/MarvelServices";
import PropTypes from 'prop-types';

class CharInfo extends Component {
    state = {
        char: {
            comics: [],
        },
        loading: true,
        error: false
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.loadChar(2);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.selectedChar !== this.props.selectedChar) {
            this.loadChar(this.props.selectedChar);
        }
    }

    onCharLoaded = (char) => {
        this.setState({char, loading: false, selectedChar: char.id})
    }

    onError = () => {
        this.setState({loading: false, error: true})
    }

    loadChar = (id) => {
        this.setState({loading: true, error: false});
        this.marvelService
            .getCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.onError)
    }

    render() {
        const {char, loading, error} = this.state;
        const spinner = loading ? <Spiner/> : null;
        const errorMessage = error ? <ErrorMesaage/> : null;

        const charView = loading || error ? null : <View char={char}/>;

        return (
            <div className="char__info">
                {errorMessage}
                {spinner}
                {charView}
            </div>
        )
    }
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
