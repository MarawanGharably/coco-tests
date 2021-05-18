import styled from '@emotion/styled';
import SelectComponent from 'react-select';
import RightSideBarComponent from '../../../right-side-bar/RightSideBar';

export const Title = styled.div`
    font-size: 2em;
    font-weight: bold;
    margin: 1vh 0;
    text-align: center;
`;

export const Select = styled(SelectComponent)`
    font-size: 1.5em;
`;

export const RightSideBar = styled(RightSideBarComponent)`
    height: 100%;
`;
