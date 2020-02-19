import React from 'react';
import { css } from '@emotion/react';
import PropTypes from 'prop-types';

const errorMessageCss = css`
    color: red;
    font-size: 11px;
    width: 24em;
    margin: 1px 0 0 5px;
`;

const ErrorMessage = ({ text }) => (
    <li css={errorMessageCss}>{text}</li>
);

ErrorMessage.propTypes = {
    text: PropTypes.string.isRequired,
};

export default ErrorMessage;
