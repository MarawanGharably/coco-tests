import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';

const baseButtonCss = css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: inherit;
    height: inherit;
    background: #FF74A6;
    border: 1px solid #FF74A6;
    border-radius: 5px;
    &:hover {
        cursor: pointer;
    }
`;

const baseTextCss = css`
    font-size: 14px;
    font-weight: 600;
    color: #FFF;
    letter-spacing: 0.8px;
`;

// Fancy button uses emotion's style composition to receieve styles from props
const FancyButton = ({
    buttonStyle, textStyle, onClick, type, text,
}) => (
    // eslint-disable-next-line react/button-has-type
    <button css={[baseButtonCss, buttonStyle]} aria-label="fancy button" onClick={onClick} type={type}>
        <span css={[baseTextCss, textStyle]}>{text}</span>
    </button>
);

FancyButton.propTypes = {
    buttonStyle: PropTypes.func,
    onClick: PropTypes.func,
    type: PropTypes.string,
    textStyle: PropTypes.func,
    text: PropTypes.string,
};

FancyButton.defaultProps = {
    buttonStyle: null,
    onClick: null,
    type: null,
    textStyle: null,
    text: '',
};

export default FancyButton;
