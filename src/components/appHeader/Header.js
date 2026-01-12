import Banner from '../appBanner/Banner';

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
            <Banner/>
        </div>
    );
}

export default Header;
