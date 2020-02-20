import React from 'react';
// import { jsx } from "@emotion/react";
import { Route, Switch } from 'react-router-dom';

import Header from './layouts/header/Header';
import BodyWrapper from './layouts/body-wrapper/BodyWrapper';
import Footer from './layouts/footer/Footer';
import HomePage from './pages/home-page/HomePage';
import RegisterPage from './pages/register-page/RegisterPage';
import CreatePage from './pages/create-page/CreatePage';

// Only needs to import CSS once at <App /> level.
// All imports for styling should happen in main.scss level from here on
import './main.scss';

const App = () => (
    <div className="app-container flex flex-column flex-1">
        <Header />
        <BodyWrapper>
            <Switch>
                <Route
                    path="/"
                    exact
                    component={HomePage}
                />
                <Route
                    path="/register"
                    component={RegisterPage}
                />
                <Route
                    path="/create"
                    component={CreatePage}
                />
            </Switch>
        </BodyWrapper>
        <Footer />
    </div>
);

export default App;
