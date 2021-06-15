import styled from '@emotion/styled';

export const Container = styled.div`
    font-size: 1.5em;
`;

export const Input = styled.input`
    position: absolute;
    top: auto;
    overflow: hidden;
    clip: rect(1px, 1px, 1px, 1px);
    width: 1px;
    height: 1px;
    white-space: nowrap;

    &:checked + label::after {
        left: 1.6em;
        border-color: #3c76fa;
    }

    &:checked + label::before {
        background-color: #3c76fa;
        border-color: #3c76fa;
    }

    &:disabled + label::before {
        background-color: transparent;
        border-color: #ddd;
    }

    &:disabled:checked + label::before {
        background-color: #767676;
    }

    &:disabled + label::after {
        border-color: #ddd;
    }
`;

export const Label = styled.label`
    cursor: pointer;
    display: block;
    position: relative;
    padding: 0.6em;
    padding-left: 4em;

    &::before,
    &::after {
        content: "";
        position: absolute;
        height: 1.5em;
        transition: all 0.25s ease;
    }

    &::before {
        left: 0;
        top: 0.2em;
        width: 3em;
        border: 0.2em solid #767676;
        background: #767676;
        border-radius: 1.1em;
    }

    &::after {
        left: 0;
        top: 0.25em;
        background-color: #fff;
        background-position: center center;
        border-radius: 50%;
        width: 1.5em;
        border: 0.15em solid #767676;
    }
`;