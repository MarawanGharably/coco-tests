import React from 'react';
import PropType from 'prop-types';
import Layout from "../../layouts/Layout";

const ErrorPage = ({ statusCode }) => (
    <Layout title={`ERROR: ${statusCode}`} subTitle="An error has occurred. Contact us @ contact@obsessvr.com" />
);

ErrorPage.propTypes = {
    statusCode: PropType.string.isRequired,
};

export default ErrorPage;
