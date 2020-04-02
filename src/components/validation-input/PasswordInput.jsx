import React from 'react';
import PropTypes from 'prop-types';

import Input from '../input/Input';
import { validatePassword } from './utils/validate';

const PasswordInput = ({ value, handleChange }) => (
    <Input
        type="password"
        formField="password"
        labelTitle="Password"
        placeholder="password"
        labelId="password-input"
        value={value}
        handleChange={handleChange}
        validationFunc={validatePassword}
    />
);

PasswordInput.propTypes = {
    value: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
};

export default PasswordInput;
