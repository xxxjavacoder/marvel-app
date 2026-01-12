import './randomChar.scss';
import thorImg from '../../resources/img/thor.jpg';

function RandomChar() {
    return (
        <div className="random-char">
            <div className="random-char__hero">
                <img className="random-char__hero-img" src={thorImg} alt="thor" />
                <div className="random-char__hero-wrapper">
                    <div className="random-char__hero-title fw-bold fz-24">
                        Thor
                    </div>
                    <div className="random-char__hero-text">
                        As the Norse God of thunder and lightning, Thor wields one of the greatest weapons ever made, the enchanted hammer Mjolnir. While others have described Thor as an over-muscled, oafish imbecile, he's quite smart and compassionate...
                    </div>
                    <div className="random-char__hero-btns">
                        <button className="btn btn-red">
                            HOMEPAGE
                        </button>
                        <button className="btn btn-gray">
                            WIKI
                        </button>
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
                <button className="btn btn-red mt-4">TRY IT</button>
            </div>
        </div>
    );
}

export default RandomChar;
