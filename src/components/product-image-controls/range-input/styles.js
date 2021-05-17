import { css } from '@emotion/react';

export const flexStyle = css`
    display: flex;
    align-items: center;
    margin-top: 1em;
`;

export const labelStyle = css`
    font-size: 2em;
`;

export const rangeStyle = css`
    margin: 0 1em;
`;

export const textStyle = css`
    background-color: transparent;
    width: 3em;
    text-align: center;
    border: 1px solid #fff;
    border-radius: 15px;
    font-size: 2em;
    margin: 5px 0;
    color: #fff;
    &:focus {
        outline-width: 0;
    }
`;
