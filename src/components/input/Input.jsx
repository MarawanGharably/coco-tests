import React, { useRef } from 'react';
import { css } from '@emotion/react';
import PropTypes from 'prop-types';

const Input = ({
    type,
    labelId,
    labelTitle,
    value,
    handleChange,
    placeholder,
    decoratorComponent,
    width,
    height,
    containerStyle,
}) => {
    const containerWidth = css`
        width: ${width};
        height: ${height};
    `;
    const inputElement = useRef(null);
    const focusInput = () => { inputElement.current.focus(); };

    return (
        <div
            role="textbox"
            tabIndex={0}
            className="input-border-container"
            css={[containerWidth, containerStyle]}
            onFocus={focusInput}
            onClick={focusInput}
            onKeyDown={(e) => { if (e.keyCode === 13) { focusInput(); } }}
        >
            <div className="input-container">
                <label htmlFor={labelId} className="input-label">{labelTitle}</label>
                <input
                    id={labelId}
                    placeholder={placeholder}
                    className="input-field"
                    type={type}
                    value={value}
                    onChange={handleChange}
                    ref={inputElement}
                />
            </div>
            {decoratorComponent}
        </div>
    );
};

Input.propTypes = {
    type: PropTypes.string,
    labelTitle: PropTypes.string.isRequired,
    labelId: PropTypes.string.isRequired,
    value: PropTypes.string,
    handleChange: PropTypes.func,
    decoratorComponent: PropTypes.element,
    width: PropTypes.string,
    height: PropTypes.string,
    placeholder: PropTypes.string,
    containerStyle: PropTypes.func,
};

Input.defaultProps = {
    type: 'text',
    value: '',
    handleChange: null,
    placeholder: '',
    decoratorComponent: null,
    width: '25em',
    height: '7.5em',
    containerStyle: null,
};

export default Input;
