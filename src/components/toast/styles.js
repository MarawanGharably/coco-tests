import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

export const Container = styled.div`
    position: fixed;
    top: 2rem;
    right: 2rem;
    border-radius: 0.5em;
    padding: 1em 2em;
    background-color: ${({ backgroundColor }) => backgroundColor};
    color: #fff;
    font-weight: bold;
    font-size: 1.2rem;
    z-index: 5000;
    animation: ${({ animation }) => animation} 1s linear;
    transition: visibility 1s linear;
`;

export const fadeInDown = keyframes`
    from {
        opacity: 0;
        transform: translate3d(0, -100%, 0);
    }

    to {
        opacity: 1;
        transform: translate3d(0, 0, 0);
    }
`;

export const fadeOutDown = keyframes`
    from {
        opacity: 1;
    }

    to {
        opacity: 0;
        transform: translate3d(0, 100%, 0);
    }
`;
