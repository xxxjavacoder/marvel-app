import RandomChar from '../appRandomChar/RandomChar';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';

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
            <ErrorBoundary>
                <RandomChar/>
            </ErrorBoundary>
        </div>
    );
}

export default Header;
