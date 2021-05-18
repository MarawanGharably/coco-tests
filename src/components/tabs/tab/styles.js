import styled from '@emotion/styled';

export const Item = styled.li`
    cursor: pointer;
    display: inline-block;
    border: 1px solid transparent;
    border-bottom: none;
    bottom: -1px;
    position: relative;
    list-style: none;
    padding: 1em 2em;
    font-size: 1.5em;

    ${({ active }) => active && `
        background: #fff;
        border-color: #D4D8DF;
        color: black;
        border-radius: 5px 5px 0 0;
    `};
`;
