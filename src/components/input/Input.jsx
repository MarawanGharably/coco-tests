import React, { useRef } from 'react';
import { css } from '@emotion/react';
import PropTypes from 'prop-types';
import useInput from './InputHook';

const Input = ({
    formField,
    type,
    value,
    labelTitle,
    placeholder,
    handleChange,
    decoratorComponent,
    validationFunc,
}) => {
    const {
        text, handleUserInput, isValid, renderErrors,
    } = useInput(validationFunc, formField);

    const inputElement = useRef(null);
    const focusInput = () => { inputElement.current.focus(); };

    const validateInputType = type === 'email' || type === 'password';
    const formFocusStyle = validateInputType && css`
        &:focus-within {
            color: ${isValid ? 'green' : 'red'};
            border: ${isValid ? '1px solid green' : '1px solid red'};
        }
    `;

    // Returns an input that prioritizes text/onChange handlers from props.
    // If no props are passed down, we will use the in-built onChange handler
    return (
        <>
            <div
                role="textbox"
                tabIndex={0}
                className="input-border-container"
                css={[formFocusStyle]}
                onFocus={focusInput}
                onClick={focusInput}
                onKeyDown={(e) => { if (e.keyCode === 13) { focusInput(); } }}
            >
                <div className="input-container">
                    <label htmlFor={formField} className="input-label">{labelTitle}</label>
                    <input
                        id={formField}
                        placeholder={placeholder}
                        className="input-field"
                        type={type}
                        value={value || text}
                        onChange={handleChange || handleUserInput}
                        ref={inputElement}
                    />
                </div>
                {decoratorComponent}
            </div>
            {text.length > 0 && !isValid && (
                <ul className="error-list-container">
                    {renderErrors()}
                </ul>
            )}
        </>
    );
};

Input.propTypes = {
    labelTitle: PropTypes.string.isRequired,
    formField: PropTypes.string.isRequired,
    type: PropTypes.string,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    handleChange: PropTypes.func,
    validationFunc: PropTypes.func,
    decoratorComponent: PropTypes.element,
};

Input.defaultProps = {
    type: 'text',
    value: '',
    placeholder: '',
    handleChange: '',
    validationFunc: null,
    decoratorComponent: null,
};

export default Input;
