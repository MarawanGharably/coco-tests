import React from 'react';
import Page from '../../layouts/page-template/Page';
import PageRow from '../../components/page-row/PageRow';
import PageItem from '../../components/page-item/PageItem';
import TextInput from '../../components/text-input/TextInput';

const ProfilePage = () => (
    <Page pageTitle="Create Your Profile" pageSubTitle="Let's get to know each other">
        <PageRow width="25%" column>
            <PageItem render={<TextInput title="Brand Name" />} />
            <PageItem render={<TextInput title="Brand Website" />} />
            <PageItem render={<TextInput title="Brand Product Category" />} />
            <PageItem render={<TextInput title="Brand Instagram" />} />
            <PageItem render={<TextInput title="Your Name" />} />
            <PageItem render={<TextInput title="Your Position" />} />
        </PageRow>
    </Page>
);

export default ProfilePage;
