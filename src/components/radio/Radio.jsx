import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import { RadioSelectionContext } from './RadioGroup';

const Radio = ({
    value, isImage, imageUrl, isLabelShowing, isDefaultSelected,
}) => {
    const {
        optionSelected, setOptionSelected, radioHandler, radioKeyboardHandler,
    } = useContext(RadioSelectionContext);

    useEffect(() => {
        if (isDefaultSelected) {
            setOptionSelected(value);
        }
    }, [isDefaultSelected, setOptionSelected, value]);

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
            aria-checked={value === optionSelected}
        >
            <label css={radioTextWrapperStyle} htmlFor={value}>
                <span css={radioTextStyle}>{isLabelShowing ? value : null}</span>
            </label>
            <input tabIndex="-1" type="radio" id={value} checked={value === optionSelected} />
            <span className="radio-custom-button-selector" />
        </div>
    );
};

Radio.propTypes = {
    value: PropTypes.string.isRequired,
    isImage: PropTypes.bool,
    imageUrl: PropTypes.string,
    isLabelShowing: PropTypes.bool,
    isDefaultSelected: PropTypes.bool,
};

Radio.defaultProps = {
    isImage: false,
    isLabelShowing: false,
    imageUrl: 'https://placedog.net/325/325',
    isDefaultSelected: false,
};

export default Radio;
