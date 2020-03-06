import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Header from './layouts/header/Header';
import BodyWrapper from './layouts/body-wrapper/BodyWrapper';
import HomePage from './pages/home-page/HomePage';
import CreatePage from './pages/create-page/CreatePage';
import ExamplePage from './pages/example-form-page/ExamplePage';
import RegisterPage from './pages/register-page/RegisterPage';
import ProfilePage from './pages/profile-page/ProfilePage';
import LoginPage from './pages/register-page/LoginPage';
import Footer from './layouts/footer/Footer';

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
                    path="/signup"
                    render={() => <RegisterPage />}
                />
                <Route
                    path="/login"
                    render={() => <LoginPage />}
                />
                <Route
                    path="/create"
                    render={() => <CreatePage />}
                />
                <Route
                    path="/profile"
                    render={() => <ProfilePage />}
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
