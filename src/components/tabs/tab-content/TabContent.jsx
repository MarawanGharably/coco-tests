import React from 'react';
import PropTypes from 'prop-types';

const TabContent = ({ label, children, active }) => (
    <div data-label={label} data-active={active}>{children}</div>
);

TabContent.propTypes = {
    label: PropTypes.string.isRequired,
    active: PropTypes.bool,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]).isRequired,
};

TabContent.defaultProps = {
    active: false,
};

export default TabContent;
