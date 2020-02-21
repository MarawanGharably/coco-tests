import React from 'react';
import { css } from '@emotion/react';

import Input from '../input/Input';
import useValidate from './ValidationHooks';
import { validateEmail } from './utils/validate';

const EmailInput = () => {
    const {
        text, handleUserInput, isValid, renderErrors,
    } = useValidate(validateEmail);

    const formFocusStyle = css`
        &:focus-within {
            color: ${isValid ? 'green' : 'red'};
            border: ${isValid ? '1px solid green' : '1px solid red'};
        }
    `;

    return (
        <div className="validation-input-container">
            <Input
                type="email"
                labelTitle="Email"
                placeholder="email"
                labelId="email-input"
                value={text}
                handleChange={handleUserInput}
                containerStyle={formFocusStyle}
            />
            {text.length > 0 && !isValid && (
                <ul className="error-list-container">
                    {renderErrors()}
                </ul>
            )}
        </div>
    );
};

export default EmailInput;
