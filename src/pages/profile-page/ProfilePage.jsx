import React from 'react';
import Page from '../../layouts/page-template/Page';
import PageRow from '../../components/page-row/PageRow';
import PageItem from '../../components/page-item/PageItem';
import TextInput from '../../components/text-input/TextInput';

const ProfilePage = () => (
    <Page pageTitle="Create Your Profile" pageSubTitle="Let's get to know each other">
        <PageRow width="25%" column>
            <PageItem>
                <TextInput title="Brand Name" />
            </PageItem>
            <PageItem>
                <TextInput title="Brand Website" />
            </PageItem>
            <PageItem>
                <TextInput title="Brand Product Category" />
            </PageItem>
            <PageItem>
                <TextInput title="Brand Instagram" />
            </PageItem>
            <PageItem>
                <TextInput title="Your Name" />
            </PageItem>
            <PageItem>
                <TextInput title="Your Position" />
            </PageItem>
        </PageRow>
    </Page>
);

export default ProfilePage;
