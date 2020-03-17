import React from 'react';
import FancyButton from '../../components/fancy-button/FancyButton';
import SpinLoader from '../../components/spin-loader/SpinLoader';

const SubmitButton = ({ submitting, onClick }) => {
    return (
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
};

export default SubmitButton;
