import React from 'react';
import { css } from '@emotion/react';

import Input from '../input/Input';
import useValidate from './ValidationHooks';
import { validatePassword } from './utils/validate';

const PasswordInput = () => {
    const {
        text, handleUserInput, isValid, renderErrors,
    } = useValidate(validatePassword);

    const formFocusStyle = css`
        &:focus-within {
            color: ${isValid ? 'green' : 'red'};
            border: ${isValid ? '1px solid green' : '1px solid red'};
        }
    `;

    return (
        <div className="validation-input-container">
            <Input
                type="password"
                labelTitle="Password"
                placeholder="password"
                labelId="password-input"
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

export default PasswordInput;
