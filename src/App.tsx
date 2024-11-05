import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import AppRouter from './AppRouter';

const App: React.FC = () => {
    return (
        <Router>
            <Navbar />
            <AppRouter />
        </Router>
    );
};

export default App;