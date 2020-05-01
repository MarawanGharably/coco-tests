import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import SubmitButton from '../../components/submit-button/SubmitButton';
import { FooterNavContext } from '../../pages/create-page/FooterNavContextComponent';

const Footer = ({ hasSubmitButton, submitting, onSubmitClicked }) => {
    const FooterContextValues = useContext(FooterNavContext);
    const {
        currentPath, text, goToNextPage,
    } = FooterContextValues;

    let isSubmitPage = false;
    if (currentPath === '/create/submit') {
        isSubmitPage = true;
    }


    return (
        <footer className="footer-container full-width flex flex-center">
            {
                hasSubmitButton && !isSubmitPage && (
                    <div className="footer-button-container">
                        <SubmitButton
                            buttonText={text}
                            submitting={submitting}
                            onClick={onSubmitClicked || goToNextPage}
                        />
                    </div>
                )
            }
        </footer>

    );
};

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
