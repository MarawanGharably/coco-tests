import React from 'react';
import { css } from '@emotion/react';
import PropTypes from 'prop-types';

import InfoHover from '../info-hover/InfoHover';

// PageRow semantically styles a row of components on a page.
// It takes in PageItem(s) as children and distributes them evenly.
// Passing a column prop will vertically assign it's children.
// eslint-disable-next-line
const PageRow = ({ header, column, width, hasInfo, infoTitle, infoText, children }) => {
    const rowDimsCss = css`
        width: ${width};
    `;

    return (
        <div className="flex flex-center flex-column" css={rowDimsCss}>
            {header && (
                <header className="page-row-header flex">
                    {header}
                    {hasInfo && <InfoHover title={infoTitle} message={infoText} />}
                </header>
            )}
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
    infoTitle: PropTypes.string,
    infoText: PropTypes.string,
    children: PropTypes.element,
};

PageRow.defaultProps = {
    header: '',
    column: false,
    width: '100%',
    hasInfo: false,
    infoTitle: '',
    infoText: '',
    children: null,
};

export default PageRow;
