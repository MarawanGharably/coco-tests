import React, { useRef } from 'react';
import { css } from '@emotion/react';
import useValidation from '../../src/components/validation-input/useInput';

const textFloat = css`
    margin: 3px 8px;
    font-size: 10px;
    text-transform: capitalize;
`;

const inputCss = css`
    height: 1.5em;
    font-size:16px;
    margin: 2.5px 8px;
    width: auto;
    border: 1px solid transparent;
    color: black;
    -webkit-appearance: none;
    &:focus {
        outline-width: 0;
    }
`;

const ulCss = css`
    margin: 5px 20px;
    padding: 0;
`;

const testType = 'email';
export const ValidationForm = () => {
    const {
        formText, handleUserInput, errorText, isValid,
    } = useValidation(testType);
    const inputElement = useRef(null);

    const focusInput = () => { inputElement.current.focus(); };

    const containerCss = css`
        display: flex;
        flex-direction: column;
        border: 1px solid #979797;
        border-radius: 3px;
        width: 25em;
        height: 3.5em;
        color: #979797;
        font-family: sans-serif;
        &:focus {
            outline-width: 0;
        }
        &:focus-within {
            color: ${isValid ? 'green' : 'red'};
            border: 1px solid ${isValid ? 'green' : 'red'};
        }
    `;

    return (
        <>
            <div css={containerCss} role="textbox" tabIndex="0" onFocus={focusInput} onClick={focusInput} onKeyDown={(e) => { if (e.keyCode === 13) { focusInput(); } }}>
                <span css={textFloat}>{testType}</span>
                <input css={inputCss} type={testType} name="something" value={formText} onChange={handleUserInput} ref={inputElement} placeholder={testType} />
            </div>
            <ul css={ulCss}>
                {errorText}
            </ul>
        </>
    );
};

export default {
    title: 'Validation Form',
    component: ValidationForm,
};

ValidationForm.story = {
    name: 'Validation Form',
};
