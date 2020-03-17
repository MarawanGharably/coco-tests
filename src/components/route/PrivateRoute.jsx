import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../../auth/Auth';

function PrivateRoute(props) {
    const [state,] = useAuth();
    return (
        state.isAuthenticated ? <Route {...props} /> : <Redirect to='/login' />
    );
}

export default PrivateRoute;
