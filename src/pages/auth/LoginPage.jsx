import React from 'react';
import Page from '../../layouts/page-template/Page';
import PageRow from '../../components/page-row/PageRow';
import LogInForm from '../../components/Forms/Auth/LogInForm';

const LoginPage = () => (
    <Page pageTitle="Login" pageSubTitle="Welcome back">
        <PageRow column width="50em">
            <LogInForm />
        </PageRow>
    </Page>
);

export default LoginPage;
