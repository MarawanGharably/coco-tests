import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

function PrivateRoute(props) {
    const { session } = props;
    // eslint-disable-next-line react/jsx-props-no-spreading
    return session.isAuthenticated ? <Route {...props} /> : <Redirect to="/login" />;
}

PrivateRoute.propTypes = {
    session: PropTypes.InstanceOf(PropTypes.Object).isRequired,
};

const mapStateToProps = ({ session }) => ({
    session,
});

export default connect(mapStateToProps, {})(PrivateRoute);
