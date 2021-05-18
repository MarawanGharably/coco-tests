import React from 'react';
import PropTypes from 'prop-types';

const TabContent = ({ label, children }) => (
    <div label={label}>{children}</div>
);

TabContent.propTypes = {
    label: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]).isRequired,
};

export default TabContent;
