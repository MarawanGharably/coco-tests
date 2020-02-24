import React from 'react';
import { css } from '@emotion/react';
import PropTypes from 'prop-types';

// eslint-disable-next-line
const PageRow = ({ header, column, width, hasInfo, infoText, children }) => {
    const rowDimsCss = css`
        width: ${width};
    `;

    return (
        <div className="flex flex-center flex-column" css={rowDimsCss}>
            <header className="page-row-header">
                {header}
                {/* {hasInfo && //RENDER INFO HOVER ICON} */}
            </header>
            <div className="page-row flex flex-center flex-1">
                {column ? <div className="full-width">{children}</div> : children}
            </div>
        </div>
    );
};

PageRow.propTypes = {
    header: PropTypes.string,
    column: PropTypes.bool,
    width: PropTypes.string,
    hasInfo: PropTypes.bool,
    infoText: PropTypes.string,
    children: PropTypes.element,
};

PageRow.defaultProps = {
    header: '',
    column: false,
    width: '100%',
    hasInfo: false,
    infoText: '',
    children: null,
};

export default PageRow;
