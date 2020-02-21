import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';

const Radio = ({
    radioHandler, radioKeyboardHandler, value, isSelected, isImage, imageUrl, isLabelShowing,
}) => {
    const imageRadioStyle = css({
        height: '32.5em',
        backgroundImage: `url(${imageUrl})`,
    });

    const radioTextWrapperStyle = css({
        fontWeight: 'bold',
        letterSpacing: '0.1em',
        justifySelf: isImage ? 'left' : 'center',
        alignSelf: isImage ? 'left' : 'center',
        fontSize: isImage ? '1.5em' : '2em',
        color: isImage ? 'white' : '#505050;',
    });

    const radioTextStyle = css({
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
            onClick={(e) => radioHandler(e, value)}
            onKeyDown={(e) => radioKeyboardHandler(e, value)}
            aria-checked={isSelected}
        >
            <label css={radioTextWrapperStyle} htmlFor={value}>
                <span css={radioTextStyle}>{isLabelShowing ? value : null}</span>
            </label>
            <input tabIndex="-1" type="radio" id={value} checked={isSelected} />
            <span className="radio-custom-button-selector" />
        </div>
    );
};

Radio.propTypes = {
    radioHandler: PropTypes.func.isRequired,
    radioKeyboardHandler: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    isSelected: PropTypes.bool,
    isImage: PropTypes.bool.isRequired,
    imageUrl: PropTypes.string,
    isLabelShowing: PropTypes.bool.isRequired,

};

Radio.defaultProps = {
    isSelected: false,
    imageUrl: 'https://placedog.net/325/325',
};

export default Radio;
