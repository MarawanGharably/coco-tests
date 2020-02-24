import React from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line
const PageItem = ({ column, render }) => (
    <div className="page-item flex-1">
        {render}
    </div>
);

PageItem.propTypes = {
    column: PropTypes.bool,
    render: PropTypes.element,
};

PageItem.defaultProps = {
    column: false,
    render: null,
};

export default PageItem;
