import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Page1 from './components/Stranka1'; 
import Page2 from './components/Stranka2';
import Home from './components/Home';

const AppRouter: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/stranka1" element={<Page1/>} />
            <Route path="/stranka2" element={<Page2/>} />
        </Routes>
    );
};

export default AppRouter;