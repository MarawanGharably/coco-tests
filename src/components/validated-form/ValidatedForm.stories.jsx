import React, { useState } from 'react';
import { css } from '@emotion/react';

const formCss = css`
    border: 2px solid black;
    width: 10em;
    height: 3em;
`;

const inputCss = css`
    height: 1em;
    font-size: 16px;
    width: 100%;
    border: 1px solid black;
    -webkit-appearance: none;
`;

export const ValidatedForm = () => {
    const [formText, setFormText] = useState('');
    const handleUserInput = (e) => {
        const { value } = e.target;
        setFormText(value);
    };

    return (
        <form css={formCss}>
            <span>Some Type</span>
            <input css={inputCss} name="something" type="text" value={formText} onChange={handleUserInput} />
        </form>
    );
};

export default {
    title: 'Validated Form',
    component: ValidatedForm,
};

ValidatedForm.story = {
    name: 'Validated Form',
};
