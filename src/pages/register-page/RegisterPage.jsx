import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const RegisterPage = ({ routes }) => (
    <div>
        <Link to="/">Home</Link>
        <h2>REGISTER</h2>
    </div>

);

RegisterPage.propTypes = {
    routes: PropTypes.object
};

RegisterPage.defaultProps = {
    routes: null
};

export default RegisterPage;
