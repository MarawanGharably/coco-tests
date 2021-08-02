import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { RadioSelectionContext } from '../RadioGroup/RadioGroup';
import styles from './Radio.module.scss';

// formField is required and should match API shape
const Radio = ({
    formField, value, isImage, imageUrl, isLabelShowing, isDefaultSelected,
}) => {
    const {
        optionSelected, setOptionSelected, radioHandler, radioKeyboardHandler,
    } = useContext(RadioSelectionContext);

    useEffect(() => {
        if (isDefaultSelected) {
            setOptionSelected(value);
        }
    }, [isDefaultSelected, setOptionSelected, value]);

    const imageRadioStyle = {
        height: '32.5em',
        backgroundImage: `url(${imageUrl})`,
    };

    return (
        <div
            role="radio"
            tabIndex="0"
            className={styles.radio}
            style={isImage ? imageRadioStyle : {}}
            onClick={(e) => radioHandler(e, value, formField)}
            onKeyDown={(e) => radioKeyboardHandler(e, value, formField)}
            aria-checked={value === optionSelected}
        >
            <label className={`${styles['radio-label']} ${isImage ? styles['radio-label--image']:''}`} htmlFor={value}>
                <span className={isImage ? styles['radio-label-text--image'] :''}>{isLabelShowing ? value : null}</span>
            </label>
            <input tabIndex="-1" type="radio" id={value} checked={value === optionSelected} readOnly />
            <span className={styles["radio-custom-button-selector"]} />
        </div>
    );
};

Radio.propTypes = {
    formField: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    isImage: PropTypes.bool,
    imageUrl: PropTypes.string,
    isLabelShowing: PropTypes.bool,
    isDefaultSelected: PropTypes.bool,
};

Radio.defaultProps = {
    isImage: false,
    isLabelShowing: false,
    imageUrl: '',
    isDefaultSelected: false,
};

export default Radio;
