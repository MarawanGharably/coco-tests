import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/route/PrivateRoute';
import Header from './layouts/Header';
import ToastMessages from './components/toast-messages/ToastMessages';
import HomePage from './pages/HomePage';
import CreatePage from './pages/create-page/CreatePage';
import ErrorPage from './pages/error-page/ErrorPage';
import LoginPage from './pages/auth/LoginPage';
import ResetUserPasswordWithParamsPage from './pages/auth/ResetUserPasswordWithParamsPage';
import ResetUserPasswordPage from './pages/auth/ResetUserPasswordPage';
import AdminPage from './pages/AdminPage';

// Global css/scss imports
import 'bootstrap/dist/css/bootstrap.min.css';
import './main.scss';



const App = () => (
    <>
        <Header />
        <ToastMessages />
        <Switch>
            <Route path="/password" render={() => <ResetUserPasswordWithParamsPage />} />
            <Route path="/reset-password" render={() => <ResetUserPasswordPage />} />
            <Route path="/login" render={() => <LoginPage />} />
            <PrivateRoute path="/admin" render={() => <AdminPage />} />
            <PrivateRoute path="/" exact render={() => <HomePage />} />
            <PrivateRoute path="/create" render={() => (<CreatePage />)} />
            <PrivateRoute path="/404" exact render={() => <ErrorPage statusCode="404" />} />
        </Switch>
    </>
);

export default App;
