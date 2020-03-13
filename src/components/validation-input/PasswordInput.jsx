import React from 'react';

import Input from '../input/Input';
import { validatePassword } from './utils/validate';

const PasswordInput = () => (
    <Input
        type="password"
        formField="password"
        labelTitle="Password"
        placeholder="password"
        labelId="password-input"
        validationFunc={validatePassword}
    />
);

export default PasswordInput;
