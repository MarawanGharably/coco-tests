import React from 'react';
import Page from '../../layouts/page-template/Page';
import PageRow from '../../components/page-row/PageRow';
import PageItem from '../../components/page-item/PageItem';
import ResetUserPasswordForm from '../../components/ReduxForms/Auth/ResetUserPasswordForm';


const ResetUserPasswordPage = () => (
    <Page pageTitle="Account recovery" pageSubTitle="">
        <PageRow width="50em">
            <PageItem>
                <ResetUserPasswordForm />
            </PageItem>
        </PageRow>
    </Page>
);


export default ResetUserPasswordPage;
