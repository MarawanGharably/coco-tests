import React from 'react';
// import { jsx } from "@emotion/react";
import { Route, Switch } from 'react-router-dom';

import Header from './layouts/header/Header';
import BodyWrapper from './layouts/body-wrapper/BodyWrapper';
import HomePage from './pages/home-page/HomePage';
import CreatePage from './pages/create-page/CreatePage';
import ExamplePage from './pages/example-form-page/ExamplePage';
import Footer from './layouts/footer/Footer';
import RegisterPage from './pages/register-page/RegisterPage';

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
                    render={() => <HomePage />}
                />
                <Route
                    path="/register"
                    render={() => <RegisterPage />}
                />
                <Route
                    path="/create"
                    render={() => <CreatePage />}
                />
                <Route
                    path="/example"
                    exact
                    render={() => <ExamplePage />}
                />
            </Switch>
        </BodyWrapper>
        <Footer />
    </div>
);

export default App;
