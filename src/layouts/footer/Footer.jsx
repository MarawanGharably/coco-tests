import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import SubmitButton from '../../components/FormComponents/SubmitButton';
import { FooterNavContext } from '../../pages/create-page/FooterNavContextComponent';
import './_footer.scss';

const Footer = ({ hasSubmitButton, submitting, onSubmitClicked, buttonText }) => {
    const FooterContextValues = useContext(FooterNavContext);
    const { currentPath, text, goToNextPage } = FooterContextValues;

    let isSubmitPage = false;
    if (currentPath === '/create/submit') {
        isSubmitPage = true;
    }


    return (
        <footer className="footer-container full-width flex">
            {
                hasSubmitButton && !isSubmitPage && (
                    <div className="footer-button-container">
                        <SubmitButton
                            buttonText={buttonText || text}
                            submitting={submitting}
                            onClick={onSubmitClicked || goToNextPage}
                            extraClass='float-end'
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
    buttonText: PropTypes.string,
};

Footer.defaultProps = {
    hasSubmitButton: true,
    submitting: false,
    onSubmitClicked: null,
    buttonText: '',
};

export default Footer;
