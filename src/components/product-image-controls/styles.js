import { css } from '@emotion/react';

export const productControlsStyle = css`
    position: absolute;
    top: 0;
    right: 0;
    padding: 1.5em 2em 2em 2em;
    border-bottom-left-radius: 2em;
    color: #fff;
    background-color: rgba(0,0,0,.6);

    div[role="textbox"] {
        border: 0.1em solid #fff;
    }

    .input-label, .input-field {
        color: #fff;
    }
`;

export const buttonStyle = css`
    width: 10em;
    height: 4em;
    margin-right: 0.5em;
`;

export const deleteButtonStyle = css`
    background-color: red;
`;

export const flexStyle = css`
    display: flex;
    align-items: center;
`;

export const buttonsContainerStyle = css`
    margin-top: 1em;
`;
