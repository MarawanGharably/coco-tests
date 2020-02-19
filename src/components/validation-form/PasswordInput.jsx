import React from 'react';
import { css } from '@emotion/react';
import PropTypes from 'prop-types';

import Input from '../input/Input';
import useValidate from './ValidationHooks';
import { validatePassword } from './utils/validate';

const PasswordInput = ({ width }) => {
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
                width={width}
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

PasswordInput.propTypes = {
    width: PropTypes.string,
};

PasswordInput.defaultProps = {
    width: '',
};

export default PasswordInput;
