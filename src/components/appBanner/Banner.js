import './Banner.scss';
import thorImg from '../../img/thor.jpg';

function Banner() {
    return (
        <div className="banner">
            <div className="banner__hero">
                <img className="banner__hero-img" src={thorImg} alt="thor" />
                <div className="banner__hero-wrapper">
                    <div className="banner__hero-title fw-bold fz-24">
                        Thor
                    </div>
                    <div className="banner__hero-text">
                        As the Norse God of thunder and lightning, Thor wields one of the greatest weapons ever made, the enchanted hammer Mjolnir. While others have described Thor as an over-muscled, oafish imbecile, he's quite smart and compassionate...
                    </div>
                    <div className="banner__hero-btns">
                        <button className="btn btn-red">
                            HOMEPAGE
                        </button>
                        <button className="btn btn-gray">
                            WIKI
                        </button>
                    </div>
                </div>
            </div>
            <div className="banner__random">
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

export default Banner;
