import React from 'react';
import PropTypes from 'prop-types';

import SubmitButton from '../../components/submit-button/SubmitButton';

const Footer = ({ hasSubmitButton, submitting, onSubmitClicked }) => (
    <footer className="footer-container full-width flex flex-center">
        {
            hasSubmitButton && (
                <div className="footer-button-container">
                    <SubmitButton
                        submitting={submitting}
                        onClick={onSubmitClicked}
                    />
                </div>
            )
        }
    </footer>
);

Footer.propTypes = {
    hasSubmitButton: PropTypes.bool,
    submitting: PropTypes.bool,
    onSubmitClicked: PropTypes.func,
};

Footer.defaultProps = {
    hasSubmitButton: true,
    submitting: false,
    onSubmitClicked: null,
};

export default Footer;
