import './charList.scss';
import abyss from '../../resources/img/abys.jpg';

const CharList = () => {
    return (
        <div className="char__list">
            <div className="char__grid">
                <div className="char__item">
                    <img src={abyss} alt="abyss"/>
                    <div className="char__name">Abyss</div>
                </div>
                <div className="char__item char__item_selected">
                    <img src={abyss} alt="abyss"/>
                    <div className="char__name">Abyss</div>
                </div>
                <div className="char__item">
                    <img src={abyss} alt="abyss"/>
                    <div className="char__name">Abyss</div>
                </div>
                <div className="char__item">
                    <img src={abyss} alt="abyss"/>
                    <div className="char__name">Abyss</div>
                </div>
                <div className="char__item">
                    <img src={abyss} alt="abyss"/>
                    <div className="char__name">Abyss</div>
                </div>
                <div className="char__item">
                    <img src={abyss} alt="abyss"/>
                    <div className="char__name">Abyss</div>
                </div>
                <div className="char__item">
                    <img src={abyss} alt="abyss"/>
                    <div className="char__name">Abyss</div>
                </div>
                <div className="char__item">
                    <img src={abyss} alt="abyss"/>
                    <div className="char__name">Abyss</div>
                </div>
                <div className="char__item">
                    <img src={abyss} alt="abyss"/>
                    <div className="char__name">Abyss</div>
                </div>
            </div>
            <div style={{textAlign: 'center'}}>
                <button className="btn btn-red mt-4">
                    <div className="inner">load more</div>
                </button>
            </div>
        </div>
    )
}

export default CharList;
