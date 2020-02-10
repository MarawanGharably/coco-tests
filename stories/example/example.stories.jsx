// this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement
/** @jsx jsx */
import { useState } from 'react';
import PropTypes from 'prop-types';
import { css, jsx } from '@emotion/react';
import { action } from '@storybook/addon-actions';

const colorButton = (color) => (
    css`
        width: 10%;
        background: ${color};
        height: 4em;
    `
);

const FancyButton = ({ setBackgroundColor, color }) => {
    const changeColorHandler = () => {
        action(`Current color: ${color}`);
        setBackgroundColor(color);
    };

    return (
        <button
            type="button"
            onClick={changeColorHandler}
            css={colorButton(color)}
            aria-label="Color Changer"
        />
    );
};

export const ExampleHeader = () => {
    const [backgroundColor, setBackgroundColor] = useState('#fed2db');

    const exampleEmotionHeader = css`
        width: 100%;
        font-size: 10px;
        font-family: sans-serif;
        background: ${backgroundColor};
        height: 8em;
        display: flex;
        align-items: center;
        justify-content: center;
    `;

    return (
        <div css={exampleEmotionHeader}>
            <FancyButton setBackgroundColor={setBackgroundColor} color="#c6f0eb" />
            <FancyButton setBackgroundColor={setBackgroundColor} color="#f0f0bb" />
            <FancyButton setBackgroundColor={setBackgroundColor} color="#fed2db" />
            <FancyButton setBackgroundColor={setBackgroundColor} color="#ead2ef" />
            <FancyButton setBackgroundColor={setBackgroundColor} color="#fce1c8" />
        </div>
    );
};

FancyButton.propTypes = {
    setBackgroundColor: PropTypes.func.isRequired,
    color: PropTypes.string.isRequired,
};

export default {
    title: 'Example',
    component: ExampleHeader,
};

ExampleHeader.story = {
    name: 'ExampleHeader',
};
