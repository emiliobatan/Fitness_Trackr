import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { UserProvider } from './context/userContext';
import App from './App';



ReactDOM.render(
    <Router>
        <UserProvider>
            <App />
        </UserProvider>
    </Router>,
    document.getElementById('app'),
);