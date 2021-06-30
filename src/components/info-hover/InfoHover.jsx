import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './InfoHover.scss';

const InfoHover = ({ title, message }) => {
    const [showMessage, setShowMessage] = useState(false);

    const handleHover = () => {
        setShowMessage(true);
    };

    const handleUnhover = () => {
        setShowMessage(false);
    };

    return (
        <div className="info-hover-container">
            <div className="info-hover-button-container flex flex-center" onMouseOver={handleHover} onFocus={handleHover} onMouseOut={handleUnhover} onBlur={handleUnhover}>
                <span className="info-hover-button-icon">i</span>
            </div>
            {showMessage && (
                <div className="info-hover-message-container flex flex-center flex-column">
                    <header className="info-hover-message-title">{title}</header>
                    <p className="info-hover-message">{message}</p>
                </div>
            )}
        </div>
    );
};

InfoHover.propTypes = {
    title: PropTypes.string,
    message: PropTypes.string,
};

InfoHover.defaultProps = {
    title: '',
    message: '',
};

export default InfoHover;
