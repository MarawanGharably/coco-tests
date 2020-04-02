import React from 'react';
import PropType from 'prop-types';
import Page from '../../layouts/page-template/Page';

const ErrorPage = ({ statusCode }) => (
    <Page pageTitle={`ERROR: ${statusCode}`} pageSubTitle="An error has occurred. Contact us @ contact@obsessvr.com" />
);

ErrorPage.propTypes = {
    statusCode: PropType.string.isRequired,
};

export default ErrorPage;
