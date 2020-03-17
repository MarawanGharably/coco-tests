import React from 'react';
import PropTypes from 'prop-types';
import FancyButton from '../fancy-button/FancyButton';
import SpinLoader from '../spin-loader/SpinLoader';

const SubmitButton = ({ submitting, onClick }) => (
    submitting ? (
        <SpinLoader
            style={{
                width: '50px',
                height: '50px',
                borderWidth: '5px',
                borderTopWidth: '5px',
            }}
        />
    ) : (
        <FancyButton
            text="SUBMIT"
            buttonStyle={{ width: '10em', height: '4em' }}
            onClick={onClick}
        />
    )
);

SubmitButton.propTypes = {
    submitting: PropTypes.bool,
    onClick: PropTypes.func,
};

SubmitButton.defaultProps = {
    submitting: false,
    onClick: null,
};

export default SubmitButton;
