import React from 'react';
import { css } from '@emotion/react';

import FancyButton from '../../components/fancy-button/FancyButton';

const footerButtonStyle = css`
    background: #FF74A6;
    border: 1px solid #FF74A6;
    border-radius: 5px;
`;

const footerTextStyle = css`
    color: #FFF;
    letter-spacing: 0.8px;
`;

const Footer = () => (
    <footer className="footer-container full-width flex flex-center">
        <div className="footer-button-container">
            <FancyButton
                buttonStyle={footerButtonStyle}
                textStyle={footerTextStyle}
                text="SUBMIT"
            />
        </div>
    </footer>
);

export default Footer;
