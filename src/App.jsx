import React from 'react';
// import { jsx } from "@emotion/react";
import { Route } from 'react-router-dom';

import Header from './layouts/header/Header';
import BodyWrapper from './layouts/body-wrapper/BodyWrapper';
import Footer from './layouts/footer/Footer';
import HomePage from './pages/home-page/HomePage';
import RegisterPage from './pages/register-page/RegisterPage';
// Only needs to import CSS once at <App /> level.
// All imports for styling should happen in main.scss level from here on
import './main.scss';

const App = () => (
    <div className="app-container flex flex-column flex-1">
        <Header />
        <BodyWrapper>
            <Route
                path="/"
                exact
                component={HomePage}
            />
            <Route
                path="/register"
                exact
                component={RegisterPage}
            />
        </BodyWrapper>
        <Footer />
    </div>
);

export default App;
