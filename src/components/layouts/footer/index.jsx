import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import SubmitButton from '../../FormComponents/SubmitButton';
import { FooterNavContext } from '../../CreatePageComponents/FooterNavContextComponent';
import styles from './footer.module.scss';

const Footer = ({ hasSubmitButton, submitting, onSubmitClicked, buttonText }) => {
    const FooterContextValues = useContext(FooterNavContext);
    const { currentPath, text, goToNextPage } = FooterContextValues;

    let isSubmitPage = false;
    if (currentPath === '/create/submit') {
        isSubmitPage = true;
    }


    return (
        <footer className={`${styles['footer']} d-flex`}>
            {
                hasSubmitButton && !isSubmitPage && (
                    <div className={`${styles["button-container"]} justify-content-end`}>
                        <SubmitButton
                            buttonText={buttonText || text}
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
    buttonText: PropTypes.string,
};

Footer.defaultProps = {
    hasSubmitButton: true,
    submitting: false,
    onSubmitClicked: null,
    buttonText: '',
};

export default Footer;
