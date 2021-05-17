import React from 'react';
import PropTypes from 'prop-types';
import {
    flexStyle,
    labelStyle,
    rangeStyle,
    textStyle,
} from './styles';

const RangeInput = ({
    handleChange, value, min, max, step,
}) => (
    <div css={flexStyle}>
        <div css={labelStyle}>Size:</div>
        <input
            css={rangeStyle}
            type="range"
            id="size"
            name="size"
            min={min}
            max={max}
            value={value}
            onChange={handleChange}
            step={step}
        />
        <input
            css={textStyle}
            type="text"
            id="size-number"
            name="size-number"
            value={value}
            onChange={handleChange}
        />
    </div>
);

RangeInput.propTypes = {
    handleChange: PropTypes.func.isRequired,
    value: PropTypes.number.isRequired,
    min: PropTypes.number,
    max: PropTypes.number,
    step: PropTypes.number,
};

RangeInput.defaultProps = {
    min: 0,
    max: 100,
    step: 1,
};

export default RangeInput;
