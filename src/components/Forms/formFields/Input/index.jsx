import React from 'react';
import './Input.scss';
import PropTypes from 'prop-types';

const Input = ({ input = {}, type = 'text', label = '', placeholder = '', extraClass = '', isRequired = false, disabled, meta: { touched, error, warning } }) => (
    <div className={`redix-input-field ${isRequired ? 'required' : ''} ${extraClass}`}>
        <div className="inputField">
            <label className="" htmlFor={input.name}>
                {label}
            </label>
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            <input {...input} type={type} placeholder={placeholder} disabled={disabled} autoComplete="off" />
        </div>

        {touched
            && (error || warning) && (
            <ul className="form-field-error">
                {error && <li className="field-error">{error}</li>}
                {warning && <li className="field-warn">{warning}</li>}
            </ul>
        )}
    </div>
);

Input.defaultProps = {
    type: 'text',
    label: '',
    placeholder: '',
    extraClass: '',
    isRequired: false,
    disabled: false,
};

Input.propTypes = {
    input: PropTypes.InstanceOf(PropTypes.Object).isRequired,
    meta: PropTypes.InstanceOf(PropTypes.Object).isRequired,
    type: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    extraClass: PropTypes.string,
    isRequired: PropTypes.bool,
    disabled: PropTypes.bool,
};

export default Input;
