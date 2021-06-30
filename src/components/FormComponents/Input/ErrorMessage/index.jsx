import React from 'react';
import PropTypes from 'prop-types';
import './ErrorMessage.scss';

const ErrorMessage = ({ text }) => (
    <li className="input--error">{text}</li>
);

ErrorMessage.propTypes = {
    text: PropTypes.string.isRequired,
};

export default ErrorMessage;
