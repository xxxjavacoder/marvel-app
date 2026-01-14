import RandomChar from '../appRandomChar/RandomChar';

import './Header.scss';

function Header() {
    return (
        <div>
            <div className="header">
                <div>
                    <span className="red-text">Marvel</span> information portal
                </div>
                <div>
                    <span className="red-text">Characters</span> / Comics
                </div>
            </div>
            <RandomChar/>
        </div>
    );
}

export default Header;
