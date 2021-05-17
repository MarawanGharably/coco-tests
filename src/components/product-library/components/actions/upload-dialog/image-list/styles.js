import styled from '@emotion/styled';

export const Container = styled.section`
    width: 100%;
    height: calc(100% - 5em);
    display: grid;
    grid-template-columns: repeat(4, 220px);
    grid-auto-rows: 20em;
    list-style: none;
    overflow-y: auto;
`;
