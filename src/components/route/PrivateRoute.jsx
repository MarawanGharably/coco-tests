import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../../auth/Auth';  // eslint-disable-line

function PrivateRoute(props) {
    const [state] = useAuth(); // eslint-disable-line
    return (
        // eslint-disable-next-line
        state.isAuthenticated ? <Route {...props} /> : <Redirect to="/login" />
    );
}

export default PrivateRoute;
