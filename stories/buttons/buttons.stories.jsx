// this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement
/** @jsx jsx */
import { useState } from "react";
import PropTypes from "prop-types";
import { css, jsx } from "@emotion/react";
import { action } from "@storybook/addon-actions";
import { withKnobs, text } from "@storybook/addon-knobs";

const buttonStyle = css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 8em;
    height: 3.7em;
    background: white;
    border: 1px solid black;
    background: #FF74A6;
    border: 1px solid #FF74A6;
    border-radius: 5px;
`;

const textStyle = css`
    font-size: 14px;
    font-weight: 600;
    color: #FFF;
    letter-spacing: 0.8px;
`;

// in this case the Button component is not rendered but will be used within stories
const Button = ({ textProp, buttonStyle, textStyle }) => (
    <button css={[buttonStyle]} type="button">
        <span css={[textStyle]}>{textProp}</span>
    </button>
);

Button.propTypes = {
    buttonStyle: PropTypes.func,
    textStyle: PropTypes.func,
};

Button.defaultProps = {
    buttonStyle: null,
    textStyle: null
};

export default {
    title: "Buttons",
    component: Button,
    decorators: [withKnobs]
};


// stories: each function is a state (aka 'story') - export when you want to render to storybook and to pass props or styles
export const SubmitButton = () => {
    const textProp = text("label", "test");

    return (
        <Button textProp={textProp} buttonStyle={buttonStyle} textStyle={textStyle} />
    );
};
