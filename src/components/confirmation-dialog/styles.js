import styled from '@emotion/styled';
import { css } from '@emotion/react';

export const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-content: center;
    flex-direction: column;
    text-align: center;
`;

export const Title = styled.header`
    margin-top: 0.5em;
    font-size: 2em;
`;

export const Content = styled.p`
    margin: 1.5em 0;
    font-size: 1.5em;
`;

export const Actions = styled.div`
    display: flex;
    justify-content: center;
`;

export const buttonStyle = css`
    padding: 10px 20px;
    margin-left: 0 0.5em;
`;

export const cancelButtonStyle = css`
    background: white;
    border: none;
`;

export const cancelTextStyle = css`
    text-decoration: underline;
    color: black;
`;
