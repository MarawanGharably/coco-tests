import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { withKnobs, text } from '@storybook/addon-knobs';
import { SketchPicker } from 'react-color'
import Input from '../../src/components/FormComponents/Input';

import '../../src/components/info-hover/InfoHover.scss';

const InfoHoverIcon = ({ labelId, labelTitle }) => {
    const [showMessage, setShowMessage] = useState(true);

    const handleHover = () => {
        setShowMessage(true);
    }

    const handleUnhover = () => {
        setShowMessage(false);
    }

    return (
        <div className='info-hover-container'>
            <div className='info-hover-button-container flex flex-center' onMouseOver={handleHover} onMouseOut={handleUnhover}>
                <span className='info-hover-button-icon'>i</span>
            </div>
            {showMessage && <div className='info-hover-message-container flex flex-center flex-column'>
                <header className='info-hover-message-title'>Title of Message</header>
                <p className='info-hover-message'>placeholder text lorem ipsum placeholder text lorem ipsum placeholder text lorem ipsum placeholder text lorem ipsum placeholder text lorem ipsum</p>
            </div>}
        </div>
    );
}

export default {
    title: 'InfoHover',
    component: InfoHoverIcon,
    decorators: [withKnobs],
};

// stories: each function is a state (aka 'story') - export when you want to render to storybook and to pass props or styles
export const InfoHoverTest = () => {
    return (
        <div className='flex flex-center full-width full-height'>
            <InfoHoverIcon/>
        </div>
    );
};
