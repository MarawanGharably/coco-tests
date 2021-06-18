import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Tab from './tab/Tab';

import {
    List,
    Content,
} from './styles';

const Tabs = ({ children }) => {
    const [active, setActive] = useState('');

    useEffect(() => {
        const tabs = React.Children.toArray(children);
        const activeTab = tabs.find((child) => child.props.active);
        const activeLabel = activeTab ? activeTab.props.label : tabs[0].props.label;

        setActive(activeLabel);
    }, []);

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
