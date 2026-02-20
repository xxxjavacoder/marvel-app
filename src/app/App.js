import './App.scss';

import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Characters from '../pages/Characters';
import Comics from '../pages/Comics';

function App() {
    return (
        <div className="App">
            <Router>
                <div className="header">
                    <div>
                        <span className="red-text">Marvel</span> information portal
                    </div>
                    <div>
                        <NavLink activeClassName='active' to="/">Characters</NavLink>
                        &nbsp;/&nbsp;
                        <NavLink activeClassName='active' to="/comics">Comics</NavLink>
                    </div>
                </div>
                <Routes>
                    <Route path="/" element={<Characters />}/>
                </Routes>
                <Routes>
                    <Route path="/comics" element={<Comics />}/>
                </Routes>
            </Router>
        </div>
    );
}

export default App;
