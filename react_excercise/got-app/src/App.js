import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavigationBar from './NavigationBar';
import Home from './Home';
import Search from './Search';
import Houses from './Houses';

function App() {
    return (
        <Router>
            <div className='App'>
                <NavigationBar />
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/search' element={<Search />} />
                    <Route path='/houses' element={<Houses />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
