import React from 'react';
import PropTypes from 'prop-types';
import {
    Item,
} from './styles';

const Tab = ({
    active, label, handleClick,
}) => {
    const onClick = () => {
        handleClick(label);
    };

    return (
        <Item
            active={active}
            onClick={onClick}
        >
            {label}
        </Item>
    );
};

Tab.propTypes = {
    active: PropTypes.bool.isRequired,
    label: PropTypes.string.isRequired,
    handleClick: PropTypes.func.isRequired,
};

export default Tab;
