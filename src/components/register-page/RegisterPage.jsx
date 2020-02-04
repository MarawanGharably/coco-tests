import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { useRouteMap } from "../routes";

const RegisterPage = ({ routes }) => {
    const registerRoutes = useRouteMap(routes);

    return (
        <div>
            <Link to="/">Home</Link>
            <h2>REGISTER</h2>
            {registerRoutes}
        </div>

    );
};

RegisterPage.propTypes = {
    routes: PropTypes.object
};

RegisterPage.defaultProps = {
    routes: null
};

export default RegisterPage;
