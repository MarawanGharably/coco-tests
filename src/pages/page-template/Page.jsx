import React from 'react';
import PropTypes from 'prop-types';
import PageTitle from '../../components/page-title/PageTitle';

const Page = ({ children, pageTitle, pageSubTitle }) => (
    <section className="flex flex-center full-width">
        <div className="flex flex-column flex-vertical-center full-width full-height">
            <PageTitle title={pageTitle} subTitle={pageSubTitle} />
            {children}
        </div>
    </section>
);

Page.propTypes = {
    pageTitle: PropTypes.string,
    pageSubTitle: PropTypes.string,
};

Page.defaultProps = {
    pageTitle: '',
    pageSubTitle: '',
};

export default Page;
