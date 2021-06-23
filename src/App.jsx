import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/route/PrivateRoute';
import Header from './layouts/Header';
import { EditorDataStore } from './data-store/editor-data-store/EditorDataStore';
import HomePage from './pages/HomePage';
import CreatePage from './pages/create-page/CreatePage';
import RegisterPage from './pages/auth/RegisterPage';
import { ProfilePage, ContextProvider as ProfileContextProvider } from './pages/ProfilePage';
import ErrorPage from './pages/error-page/ErrorPage';
import LoginPage from './pages/auth/LoginPage';
import ResetUserPasswordWithParamsPage from './pages/auth/ResetUserPasswordWithParamsPage';
import ResetUserPasswordPage from './pages/auth/ResetUserPasswordPage';

// Global css/scss imports
import 'bootstrap/dist/css/bootstrap.min.css';
import './main.scss';

import AdminPage from './pages/admin-page/Admin';

const App = () => (
        <>
            <Header />
            <Switch>
                <Route path="/password" render={() => <ResetUserPasswordWithParamsPage />} />
                <Route path="/reset-password" render={() => <ResetUserPasswordPage />} />
                <Route path="/login" render={() => <LoginPage />} />
                <Route path="/signup" render={() => <RegisterPage />} />
                <PrivateRoute path="/admin" render={() => <AdminPage />} />
                <PrivateRoute path="/" exact render={() => <HomePage />} />
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
                <PrivateRoute path="/404" exact render={() => <ErrorPage statusCode="404" />} />
            </Switch>
        </>
);

export default App;
