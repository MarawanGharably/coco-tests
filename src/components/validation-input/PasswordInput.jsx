import React from 'react';
import PropTypes from 'prop-types';

import Input from '../input/Input';
import { validatePassword } from './utils/validate';

const PasswordInput = ({ value, handleChange, validate }) => (
    <Input
        type="password"
        formField="password"
        labelTitle="Password"
        placeholder="password"
        labelId="password-input"
        value={value}
        handleChange={handleChange}
        validationFunc={validatePassword}
        validate={validate}
    />
);

PasswordInput.propTypes = {
    value: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    validate: PropTypes.bool,
};

PasswordInput.defaultProps = {
    validate: true,
};

export default PasswordInput;
