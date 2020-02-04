/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import PropTypes from "prop-types";
import { useState } from "react";

import FancyButton from "../../components/fancy-button/FancyButton";

const footerButtonStyle = css`
    background: #FF74A6;
    border: 1px solid #FF74A6;
    border-radius: 5px;
`;

const footerTextStyle = css`
    color: #FFF;
    letter-spacing: 0.8px;
`;

const Footer = () => {
    const [showButton, setShowButton] = useState(false);

    return (
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
};

export default Footer;
