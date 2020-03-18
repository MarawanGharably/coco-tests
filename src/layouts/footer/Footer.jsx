import React from 'react';
import PropTypes from 'prop-types';

import SubmitButton from '../../components/submit-button/SubmitButton';

const Footer = ({ submitting, onSubmitClicked }) => (
    <footer className="footer-container full-width flex flex-center">
        <div className="footer-button-container">
            <SubmitButton
                submitting={submitting}
                onClick={onSubmitClicked}
            />
        </div>
    </footer>
);

Footer.propTypes = {
    submitting: PropTypes.bool,
    onSubmitClicked: PropTypes.func,
};

Footer.defaultProps = {
    submitting: false,
    onSubmitClicked: null,
};

export default Footer;
