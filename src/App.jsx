import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Header from './layouts/header/Header';
import BodyWrapper from './layouts/body-wrapper/BodyWrapper';
import { HomePageDataStore } from './data-store/home-page-data-store/HomePageDataStore';
import HomePage from './pages/home-page/HomePage';
import CreatePage from './pages/create-page/CreatePage';
import ExamplePage from './pages/example-form-page/ExamplePage';
import RegisterPage from './pages/register-page/RegisterPage';
import ProfilePage from './pages/profile-page/ProfilePage';
import ErrorPage from './pages/error-page/ErrorPage';
import LoginPage from './pages/register-page/LoginPage';
import Footer from './layouts/footer/Footer';
import CreatePasswordPage from './pages/register-page/CreatePasswordPage';

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
                    render={() => (
                        <HomePageDataStore>
                            <HomePage />
                        </HomePageDataStore>
                    )}
                />
                <Route
                    path="/password"
                    render={() => <CreatePasswordPage />}
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
                <Route
                    path="/404"
                    exact
                    render={() => <ErrorPage statusCode="404" />}
                />
            </Switch>
        </BodyWrapper>
        <Footer />
    </div>
);

export default App;
