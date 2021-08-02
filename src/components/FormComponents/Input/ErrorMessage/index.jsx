import React from 'react';
import PropTypes from 'prop-types';
import styles from './ErrorMessage.module.scss';

const ErrorMessage = ({ text }) => (
    <li className={styles.errorMessage}>{text}</li>
);

ErrorMessage.propTypes = {
    text: PropTypes.string.isRequired,
};

export default ErrorMessage;
