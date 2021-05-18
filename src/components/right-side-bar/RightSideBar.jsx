import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';

const RightSideBar = ({
    cols, rowHeight, children, title, className,
}) => {
    const colsAndHeightCss = css`
        grid-template-columns: repeat(${cols}, 1fr);
        grid-auto-rows: ${rowHeight};
    `;

    return (
        <div className={`side-bar-container ${className}`}>
            {title && <div className="side-bar-container-title">{title}</div>}
            <aside className="right-side-bar" css={[colsAndHeightCss]}>
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
