import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';

const RightSideBar = ({ cols, rowHeight, children }) => {
    const colsAndHeightCss = css`
        grid-template-columns: repeat(${cols}, 1fr);
        grid-auto-rows: ${rowHeight};
    `;

    return (
        <aside className="right-side-bar" css={[colsAndHeightCss]}>
            {children}
        </aside>
    );
};

RightSideBar.propTypes = {
    cols: PropTypes.string,
    rowHeight: PropTypes.string,
};

RightSideBar.defaultProps = {
    cols: '1',
    rowHeight: '10em',
};

export default RightSideBar;
