
import styled from '@emotion/styled';

export const List = styled.ol`
    border-bottom: 1px solid #D4D8Df;
    margin: 0;
    padding: 0;
`;

export const Content = styled.div`
    padding: 1em;
    border: 1px solid #D4D8Df;
    border-top: 0;
    display: ${({ active }) => !active && 'none'};
`;
