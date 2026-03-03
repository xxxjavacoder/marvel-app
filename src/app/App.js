import './App.scss';

import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import {lazy, Suspense} from "react";
import Spinner from '../components/spiner/Spinner';
import Form from '../components/form/Form';

const Characters = lazy(() => import('../pages/Characters'));
const Comics = lazy(() => import('../pages/Comics'));
const NotFound = lazy(() => import('../pages/NotFound'));
const SingleComic = lazy(() => import('../pages/SingleComic'));

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
                    <NavLink className={({isActive}) => isActive ? "active" : ""} to="/form">Form</NavLink>
                </div>

                <Suspense fallback={<Spinner />}>
                    <Routes>
                        <Route path="/" element={<Characters />}/>
                        <Route path="/comics" element={<Comics />}/>
                        <Route path="/comics/:comicId" element={<SingleComic comicId={1} />}/>
                        <Route path="/form" element={<Form />}/>
                        <Route path="*" element={<NotFound />}></Route>
                    </Routes>
                </Suspense>
            </Router>
        </div>
    );
}

export default App;
