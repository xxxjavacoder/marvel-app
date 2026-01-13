import {Component} from 'react';
import MarvelService from '../../services/MarvelServices';

import './randomChar.scss';

class RandomChar extends Component {
    constructor(props) {
        super(props);
        this.updateChar();
    }

    state = {
        char: {}
    }

    marvelService = new MarvelService();

    onCharLoaded = (char) => {
        this.setState({char})
    }

    updateChar = () => {
        const id = Math.floor(Math.random() * 20) + 1;
        this.marvelService
            .getCharacter(id)
            .then(this.onCharLoaded)
            .catch(err => console.log(err))
    }

    render() {
        const {char: {name, description, thumbnail, homepage, wiki}} = this.state;
        return (
            <div className="random-char">
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
                <div className="random-char__random">
                    <div className="fz-24 fw-bold">
                        Random character for today!
                        Do you want to get to know him better?
                    </div>
                    <div className="fz-24 fw-bold mt-4">
                        Or choose another one
                    </div>
                    <button onClick={this.updateChar} className="btn btn-red mt-4">TRY IT</button>
                </div>
            </div>
        )
    }
}

export default RandomChar;
