import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';

import {
    withKnobs, text, boolean,
} from '@storybook/addon-knobs';

import '../../src/main.scss';

// COMPONENT

const Radio = ({
    idx, radioHandler, radioKeyboardHandler, value, isSelected, isImage, imageUrl,
}) => {
    const imageRadioStyle = css({
        height: '32.5em',
        backgroundImage: `url(${imageUrl})`,
        justifySelf: isImage ? 'left' : 'center',
    });

    const imageRadioLabel = css({
        fontWeight: 'bold',
        letterSpacing: '0.1em',
        justifySelf: isImage ? 'left' : 'center',
        alignSelf: isImage ? 'left' : 'center',
        fontSize: isImage ? '1.5em' : '2em',
        color: isImage ? 'white' : '#505050;',
    });

    const imageRadioLabelContent = css({
        position: isImage && 'relative',
        top: isImage && '0.3em',
        left: isImage && '0.3em',
    });

    return (
        <div
            role="radio"
            tabIndex="0"
            className="radio"
            css={isImage && imageRadioStyle}
            onClick={(e) => radioHandler(e, value, idx)}
            onKeyDown={(e) => radioKeyboardHandler(e, value, idx)}
            aria-checked={isSelected}
        >
            <label css={imageRadioLabel} htmlFor={idx}>
                <span css={imageRadioLabelContent}>{value}</span>
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
