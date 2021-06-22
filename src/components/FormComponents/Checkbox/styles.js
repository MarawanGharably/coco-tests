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
        opacity: 1;
        transform: scale(1) rotate(0);
    }

    &:focus + label::before {
        box-shadow: inset 0 1px 3px rgba(0,0,0, .1), 0 0 0 3px rgba(60, 118, 250, .2);
    }

    &:disabled + label::before {
        background-color: transparent;
        border-color: #aaa;
    }

    &:disabled + label::after {
        border-color: #aaa;
        color: #aaa;
    }

    &:disabled + label {
        color: #777;
    }
`;

export const Label = styled.label`
    cursor: pointer;
    display: block;
    position: relative;
    padding: 0.5em;
    padding-left: 2.3em;

    &::before {
        content: '';
        margin: 3px 0 3px 3px;
        position: absolute;
        left: 0;
        top: 0;
        width: 1.4em;
        height: 1.4em;
        border: 1px solid #aaa;
        background: #FFF;
        border-radius: .2em;
        box-shadow: inset 0 1px 3px rgba(0,0,0, .1), 0 0 0 rgba(60, 118, 250, .2);
        transition: all .2s;
    }

    &::after {
        content: '✕';
        position: absolute;
        top: 0.8em;
        left: 0.35em;
        font-size: 1.3em;
        color: #3c76fa;
        line-height: 0;
        transition: all .3s;
        opacity: 0;
        transform: scale(0) rotate(45deg);
    }
`;
