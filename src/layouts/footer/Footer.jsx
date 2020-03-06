import React, { useContext } from 'react';
import FancyButton from '../../components/fancy-button/FancyButton';
import { FooterNavContext } from '../../pages/create-page/FooterNavigation';

const Footer = () => {
    const {
        currentPath, nextPath, prevPath, text, // eslint-disable-line
    } = useContext(FooterNavContext);
    return (
        <footer className="footer-container full-width flex flex-center">
            <div className="footer-button-container">
                <FancyButton
                    text={text || 'Unspecified'}
                />
            </div>
        </footer>
    );
};

export default Footer;
