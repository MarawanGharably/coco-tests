import React from 'react';
import PropTypes from 'prop-types';

import Input from '../input/Input';
import { validateEmail } from './utils/validate';

const EmailInput = ({ value, handleChange }) => (
    <Input
        type="email"
        formField="email"
        labelTitle="Email"
        placeholder="email"
        labelId="email-input"
        value={value}
        handleChange={handleChange}
        validationFunc={validateEmail}
    />
);

EmailInput.propTypes = {
    value: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
};

export default EmailInput;
