import React from 'react';
import PropTypes from 'prop-types';
import './RightSideBar.scss';

const RightSideBar = ({
    cols, rowHeight, children, title, className,
}) => {
    const colsAndHeightStyles = {
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridAutoRows: rowHeight,
    };

    return (
        <div className={`side-bar-container ${className}`}>
            {title && <div className="side-bar-container-title">{title}</div>}
            <aside className="right-side-bar" style={colsAndHeightStyles}>
                {children}
            </aside>
        </div>
    );
};

RightSideBar.propTypes = {
    cols: PropTypes.string,
    rowHeight: PropTypes.string,
    title: PropTypes.string,
    className: PropTypes.string,
};

RightSideBar.defaultProps = {
    cols: '1',
    rowHeight: '10em',
    title: '',
    className: '',
};

export default RightSideBar;
