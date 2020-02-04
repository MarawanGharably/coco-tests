/** @jsx jsx */
import PropTypes from "prop-types";
import { css, jsx } from "@emotion/react";

const baseButtonCss = css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 8em;
    height: 3.7em;
    background: white;
    border: 1px solid black;
`;

const baseTextCss = css`
    font-size: 14px;
    font-weight: 600;
`;

// Fancy button uses emotion's style composition to receieve styles from props
const FancyButton = ({
    buttonStyle, textStyle, onClick, text
}) => (
    <button css={[baseButtonCss, buttonStyle]} type="button" aria-label="fancy button" onClick={onClick}>
        <span css={[baseTextCss, textStyle]}>{text}</span>
    </button>
);

FancyButton.propTypes = {
    buttonStyle: PropTypes.func,
    onClick: PropTypes.func,
    textStyle: PropTypes.func,
    text: PropTypes.string
};

FancyButton.defaultProps = {
    buttonStyle: null,
    onClick: null,
    textStyle: null,
    text: ""
};

export default FancyButton;
