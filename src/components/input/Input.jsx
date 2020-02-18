import React from 'react';
import { css } from '@emotion/react';
import PropTypes from 'prop-types';

const Input = ({
    labelId, labelTitle, value, handleChange, placeholder, decoratorComponent, width, height,
}) => {
    const containerWidth = css`
        width: ${width};
        height: ${height};
    `;

    return (
        <div className="input-border-container" css={containerWidth}>
            <div className="color-selector-container">
                <label htmlFor={labelId} className="input-label">{labelTitle}</label>
                <input id={labelId} placeholder={placeholder} className="input-field" type="text" value={value} onChange={handleChange} />
            </div>
            {decoratorComponent}
        </div>
    );
};

Input.propTypes = {
    labelTitle: PropTypes.string.isRequired,
    labelId: PropTypes.string.isRequired,
    value: PropTypes.string,
    handleChange: PropTypes.func,
    decoratorComponent: PropTypes.element,
    width: PropTypes.string,
    height: PropTypes.string,
    placeholder: PropTypes.string,
};

Input.defaultProps = {
    value: '',
    handleChange: null,
    placeholder: '',
    decoratorComponent: null,
    width: '18em',
    height: '5em',
};

export default Input;
