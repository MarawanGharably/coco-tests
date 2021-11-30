import React from 'react';  
import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import styles from './Input.module.scss';

const Input = ({ input = {}, mode, type = 'text', label = '', placeholder = '', disabled, meta: { touched, error, warning } }) => {
    return (
        <Form.Group className={`input-field mb-3 ${styles['input-field']} ${mode ? styles[`${mode}-mode`]:''}`} controlId={input.name}>
            {label && <Form.Label>{label}</Form.Label>}
            <Form.Control
                {...input}
                type={type}
                placeholder={placeholder}
                readOnly={!!disabled}
                autoComplete="off"
                onFocus={(e) => e.target.placeholder = ''}
                onBlur={(e) => e.target.placeholder = placeholder}
            />

            {touched && (error || warning) && (
                <ul className="form-field-error">
                    {error && <li className="field-error">{error}</li>}
                    {warning && <li className="field-warn">{warning}</li>}
                </ul>
            )}
        </Form.Group>
    );
};

Input.defaultProps = {
    type: 'text',
    label: '',
    placeholder: '',
    extraClass: '',
    disabled: false,
};

Input.propTypes = {
    input: PropTypes.InstanceOf(PropTypes.Object).isRequired,
    meta: PropTypes.InstanceOf(PropTypes.Object).isRequired,
    type: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    extraClass: PropTypes.string,
    disabled: PropTypes.bool,
};

export default Input;
