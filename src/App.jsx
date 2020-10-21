import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { AuthContextProvider } from './auth/Auth';
import PrivateRoute from './components/route/PrivateRoute';
import Header from './layouts/header/Header';
import { HomePageDataStore } from './data-store/home-page-data-store/HomePageDataStore';
import { EditorDataStore } from './data-store/editor-data-store/EditorDataStore';
import HomePage from './pages/home-page/HomePage';
import CreatePage from './pages/create-page/CreatePage';
import RegisterPage from './pages/register-page/RegisterPage';
import { ProfilePage, ContextProvider as ProfileContextProvider } from './pages/profile-page/ProfilePage';
import ErrorPage from './pages/error-page/ErrorPage';
import LoginPage from './pages/register-page/LoginPage';
import CreatePasswordPage from './pages/register-page/CreatePasswordPage';

// Only needs to import CSS once at <App /> level.
// All imports for styling should happen in main.scss level from here on
import './main.scss';
import AdminPage from './pages/admin-pages/Admin';

const App = () => (
    <div className="app-container flex flex-column flex-1">
        <AuthContextProvider>
            <HomePageDataStore>
                <Header />
                <Switch>
                    <Route
                        path="/password"
                        render={() => <CreatePasswordPage />}
                    />
                    <Route
                        path="/login"
                        render={() => <LoginPage />}
                    />
                    <Route
                        path="/signup"
                        render={() => <RegisterPage />}
                    />
                    <Route
                        path="/admin"
                        render={() => <AdminPage />}
                    />
                    <PrivateRoute
                        path="/"
                        exact
                        render={() => (
                            <HomePage />
                        )}
                    />
                    <PrivateRoute
                        path="/create"
                        render={() => (
                            <EditorDataStore>
                                <CreatePage />
                            </EditorDataStore>
                        )}
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
                        path="/404"
                        exact
                        render={() => <ErrorPage statusCode="404" />}
                    />
                </Switch>
            </HomePageDataStore>
        </AuthContextProvider>
    </div>
);

export default App;
