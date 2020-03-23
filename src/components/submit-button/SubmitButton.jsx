import React from 'react';
import PropTypes from 'prop-types';
import FancyButton from '../fancy-button/FancyButton';
import SpinLoader from '../spin-loader/SpinLoader';

const SubmitButton = ({ buttonText, buttonStyle, submitting, onClick }) => (
    submitting ? (
        <SpinLoader
            style={{
                width: '45px',
                height: '45px',
                borderWidth: '5px',
                borderTopWidth: '5px',
            }}
        />
    ) : (
        <FancyButton
            text={buttonText}
            buttonStyle={buttonStyle}
            onClick={onClick}
        />
    )
);

SubmitButton.propTypes = {
    buttonText: PropTypes.string,
    buttonStyle: PropTypes.object,
    submitting: PropTypes.bool,
    onClick: PropTypes.func,
};

SubmitButton.defaultProps = {
    buttonText: 'SUBMIT',
    buttonStyle: { width: '10em', height: '4em' },
    submitting: false,
    onClick: null,
};

export default SubmitButton;
