import './App.scss';

import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Characters from '../pages/Characters';
import Comics from '../pages/Comics';
import NotFound from '../pages/NotFound';
import SingleComic from '../pages/SingleComic';

function App() {
    return (
        <div className="App">
            <Router>
                <div className="header">
                    <div>
                        <span className="red-text">Marvel</span> information portal
                    </div>
                    <div>
                        <NavLink className={({isActive}) => isActive ? "active" : ""} to="/">Characters</NavLink>
                        &nbsp;/&nbsp;
                        <NavLink className={({isActive}) => isActive ? "active" : ""} to="/comics">Comics</NavLink>
                    </div>
                </div>

                <Routes>
                    <Route path="/" element={<Characters />}/>
                    <Route path="/comics" element={<Comics />}/>
                    <Route path="/comics/:comicId" element={<SingleComic comicId={1} />}/>
                    <Route path="*" element={<NotFound />}></Route>
                </Routes>
            </Router>
        </div>
    );
}

export default App;
