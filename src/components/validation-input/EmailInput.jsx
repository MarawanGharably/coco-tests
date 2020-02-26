import React from 'react';

import Input from '../input/Input';
import { validateEmail } from './utils/validate';

const EmailInput = () => (
    <Input
        type="email"
        labelTitle="Email"
        placeholder="email"
        labelId="email-input"
        validationFunc={validateEmail}
    />
);

export default EmailInput;
