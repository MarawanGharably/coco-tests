import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import { Button } from 'react-bootstrap';

//TODO:replace by bootstrap button and remove

const baseButtonCss = css``;

const baseTextCss = css``;

// Fancy button uses emotion's style composition to receive styles from props
const FancyButton = ({ buttonStyle, textStyle, onClick, type, text, extraClass=''}) => {
    console.log('>FancyButton', { buttonStyle, textStyle, onClick, type, text, extraClass});
    return(
        // eslint-disable-next-line react/button-has-type
        <Button css={[baseButtonCss, buttonStyle]} aria-label="fancy button" onClick={onClick} type={type}
                className={extraClass}>
            <span css={[baseTextCss, textStyle]}>{text}</span>
        </Button>
    );
}

FancyButton.propTypes = {
    buttonStyle: PropTypes.func,
    onClick: PropTypes.func,
    type: PropTypes.string,
    textStyle: PropTypes.func,
    text: PropTypes.string,
};

FancyButton.defaultProps = {
    buttonStyle: 'button',
    onClick: null,
    type: 'button',
    textStyle: null,
    text: '',
};

export default FancyButton;
