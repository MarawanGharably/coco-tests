import styled from '@emotion/styled';
import { css } from '@emotion/react';

export const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
    place-self: center;
    text-align: center;
    border-bottom: 1px solid #D4D8DF;
    margin-top: 1em;
    padding: 1em 0;
`;

export const Image = styled.img`
    margin: auto;
    max-width: 90%;
    max-height: 14em;
    object-fit: scale-down;
`;

export const deleteButtonStyle = css`
    height: 2.5em;
    background-color: red;
    margin-top: 1em;
`;
