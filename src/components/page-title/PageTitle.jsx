import React from 'react';
import PropTypes from 'prop-types';

const PageTitle = ({ title, subTitle }) => (
    <div className="page-title-container flex flex-center flex-column full-width">
        <header className="page-title">{title}</header>
        {subTitle && <header className="page-sub-title">{subTitle}</header>}
    </div>
);

PageTitle.propTypes = {
    title: PropTypes.string.isRequired,
    subTitle: PropTypes.string,
};

PageTitle.defaultProps = {
    subTitle: '',
};

export default PageTitle;
