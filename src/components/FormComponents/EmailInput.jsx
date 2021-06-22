import React from 'react';
import PropTypes from 'prop-types';

import Input from './Input';
import { validateEmail } from '../../utils/form-input-validate';

const EmailInput = ({ value, handleChange, validate }) => (
    <Input
        type="email"
        formField="email"
        labelTitle="Email"
        placeholder="email"
        labelId="email-input"
        value={value}
        validate={validate}
        handleChange={handleChange}
        validationFunc={validateEmail}
    />
);

EmailInput.propTypes = {
    value: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    validate: PropTypes.bool,
};

EmailInput.defaultProps = {
    validate: true,
};

export default EmailInput;
