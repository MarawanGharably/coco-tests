import React from 'react';
import PropTypes from 'prop-types';

import {
    withKnobs, text, boolean,
} from '@storybook/addon-knobs';

import '../../src/components/FormComponents/Radio/Radio.module.scss';

// COMPONENT

const Radio = ({
    idx, radioHandler, radioKeyboardHandler, value, isSelected, isImage, imageUrl,
}) => {
    const imageRadioStyle = {
        height: '32.5em',
        backgroundImage: `url(${imageUrl})`,
    };

    return (
        <div
            role="radio"
            tabIndex="0"
            className="radio"
            style={isImage ? imageRadioStyle : {}}
            onClick={(e) => radioHandler(e, value, idx)}
            onKeyDown={(e) => radioKeyboardHandler(e, value, idx)}
            aria-checked={isSelected}
        >
            <label className={`radio-label ${isImage ? 'radio-label--image':''}`} htmlFor={idx}>
                <span className={`${isImage && 'radio-label-text--image'}`}>{value}</span>
            </label>
            <input tabIndex="-1" type="radio" id={idx} checked={isSelected} />
            <span className="radio-custom-button-selector" />
        </div>
    );
};

Radio.propTypes = {
    idx: PropTypes.number,
    radioHandler: PropTypes.func,
    radioKeyboardHandler: PropTypes.func,
    value: PropTypes.string,
    isSelected: PropTypes.bool,
    imageUrl: PropTypes.string,
    isImage: PropTypes.bool.isRequired,

};

Radio.defaultProps = {
    idx: '1',
    radioHandler: () => { },
    radioKeyboardHandler: () => { },
    value: 'test_radio_selection',
    isSelected: true,
    imageUrl: 'https://placedog.net/325/325',
};

// END COMPONENT

// STORYBOOK
export default {
    title: 'Buttons',
    component: Radio,
    decorators: [withKnobs],
};

export const TextRadio = () => {
    const value = text('label', 'test content');
    const isSelected = boolean('isSelected');

    return (
        <Radio idx="1" isSelected={isSelected} value={value} change="handler" isImage={false} />
    );
};
export const ImageRadio = () => {
    const value = text('label', 'example test content');
    const isSelected = boolean('isSelected');

    return (
        <Radio idx="1" isSelected={isSelected} value={value} change="handler" isImage />
    );
};

// END STORYBOOK
