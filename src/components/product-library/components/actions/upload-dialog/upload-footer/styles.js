import styled from '@emotion/styled';
import { css } from '@emotion/react';
import Creatable from 'react-select/creatable';

export const Container = styled.div`
    height: 5em;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
`;

export const Select = styled(Creatable)`
    width: 23em;
    font-size: 1.5em;
`;

export const buttonStyle = css`
    max-height: 4em;
    padding: 1em 2em;
`;
