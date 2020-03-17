import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { AuthContextProvider } from './auth/Auth';
import PrivateRoute from './components/route/PrivateRoute';
import Header from './layouts/header/Header';
import BodyWrapper from './layouts/body-wrapper/BodyWrapper';
import { HomePageDataStore } from './data-store/home-page-data-store/HomePageDataStore';
import HomePage from './pages/home-page/HomePage';
import CreatePage from './pages/create-page/CreatePage';
import ExamplePage from './pages/example-form-page/ExamplePage';
import RegisterPage from './pages/register-page/RegisterPage';
import { ProfilePage, ContextProvider as ProfileContextProvider } from './pages/profile-page/ProfilePage';
import ErrorPage from './pages/error-page/ErrorPage';
import LoginPage from './pages/register-page/LoginPage';
import Footer from './layouts/footer/Footer';
import CreatePasswordPage from './pages/register-page/CreatePasswordPage';
import { FormDataStore } from './data-store/form-data-store/FormDataStore';

// Only needs to import CSS once at <App /> level.
// All imports for styling should happen in main.scss level from here on
import './main.scss';

const App = () => (
    <div className="app-container flex flex-column flex-1">
        <AuthContextProvider>
            <Header />
            <BodyWrapper>
                <Switch>
                    <Route
                        path="/password"
                        render={() => (
                            <FormDataStore>
                                <CreatePasswordPage />
                            </FormDataStore>
                        )}
                    />
                    <Route
                        path="/login"
                        render={() => (
                            <FormDataStore>
                                <LoginPage />
                            </FormDataStore>
                        )}
                    />
                    <Route
                        path="/signup"
                        render={() => <RegisterPage />}
                    />
                    <PrivateRoute
                        path="/"
                        exact
                        render={() => (
                            <HomePageDataStore>
                                <HomePage />
                            </HomePageDataStore>
                        )}
                    />
                    <PrivateRoute
                        path="/create"
                        render={() => <CreatePage />}
                    />
                    <PrivateRoute
                        path="/profile"
                        render={() => (
                            <ProfileContextProvider>
                                <ProfilePage />
                            </ProfileContextProvider>
                        )}
                    />
                    <PrivateRoute
                        path="/example"
                        exact
                        render={() => <ExamplePage />}
                    />
                    <PrivateRoute
                        path="/404"
                        exact
                        render={() => <ErrorPage statusCode="404" />}
                    />
                </Switch>
            </BodyWrapper>
            <Footer />
        </AuthContextProvider>
    </div>
);

export default App;
