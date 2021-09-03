import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import useInput from './InputHook';
import styles from './Input.module.scss';

const Input = ({
    formField,
    type,
    value,
    labelTitle,
    placeholder,
    handleChange,
    decoratorComponent,
    validationFunc,
    validate,
    focusOnMount,
}) => {
    const {
        text, handleUserInput, isValid, renderErrors,
    } = useInput(validate, validationFunc, handleChange);

    const inputElement = useRef(null);
    const focusInput = () => { inputElement.current.focus(); };

    const validateInputType = type === 'email' || type === 'password';
    const formFocusValidationClass = isValid ? styles['input-border-container--valid'] : styles['input-border-container--invalid'];
    const formFocusClasses = validateInputType && formFocusValidationClass;

    useEffect(() => {
        if (focusOnMount) {
            focusInput();
        }
    }, [focusOnMount]);

    // Returns an PermissionsEditor that prioritizes text/onChange handlers from props.
    // If no props are passed down, we will use the in-built onChange handler
    return (
        <>
            <div
                role="textbox"
                tabIndex={0}
                className={`input-border-container ${formFocusClasses}`}
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
                        onChange={handleUserInput}
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
    validate: PropTypes.bool,
    focusOnMount: PropTypes.bool,
};

Input.defaultProps = {
    type: 'text',
    value: '',
    placeholder: '',
    handleChange: null,
    validationFunc: null,
    decoratorComponent: null,
    validate: true,
    focusOnMount: false,
};

export default Input;
