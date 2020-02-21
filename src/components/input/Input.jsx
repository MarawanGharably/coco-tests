import React, { useRef } from 'react';
import PropTypes from 'prop-types';

const Input = ({
    type,
    labelId,
    labelTitle,
    value,
    handleChange,
    placeholder,
    decoratorComponent,
    containerStyle,
}) => {
    const inputElement = useRef(null);
    const focusInput = () => { inputElement.current.focus(); };

    return (
        <div
            role="textbox"
            tabIndex={0}
            className="input-border-container"
            css={[containerStyle]}
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
    labelTitle: PropTypes.string.isRequired,
    labelId: PropTypes.string.isRequired,
    type: PropTypes.string,
    value: PropTypes.string,
    handleChange: PropTypes.func,
    placeholder: PropTypes.string,
    containerStyle: PropTypes.func,
    decoratorComponent: PropTypes.element,
};

Input.defaultProps = {
    type: 'text',
    value: '',
    handleChange: null,
    placeholder: '',
    containerStyle: null,
    decoratorComponent: null,
};

export default Input;
