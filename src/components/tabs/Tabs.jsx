import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Tab from './tab/Tab';

import {
    List,
    Content,
} from './styles';

const Tabs = ({ children }) => {
    const [active, setActive] = useState(children[0].props.label);

    const onTabClick = (label) => {
        setActive(label);
    };

    const renderTabs = () => (
        React.Children.map(children, (child) => (
            <Tab
                key={child.props.label}
                active={active === child.props.label}
                label={child.props.label}
                handleClick={onTabClick}
            />
        ))
    );

    const renderContent = () => (
        React.Children.map(children, (child) => (
            <Content active={child.props.label === active}>
                {child.props.children}
            </Content>
        ))
    );

    return (
        <div>
            <List>
                {renderTabs()}
            </List>
            {renderContent()}
        </div>
    );
};

Tabs.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]).isRequired,
};

export default Tabs;
