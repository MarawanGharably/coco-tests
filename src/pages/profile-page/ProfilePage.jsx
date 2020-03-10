import React from 'react';
import Page from '../../layouts/page-template/Page';
import PageRow from '../../components/page-row/PageRow';
import PageItem from '../../components/page-item/PageItem';
import TextInput from '../../components/text-input/TextInput';
import { FormDataStore } from '../../data-store/form-data-store/FormDataStore';

const ProfilePage = () => (
    <FormDataStore>
        <Page pageTitle="Create Your Profile" pageSubTitle="Let's get to know each other">
            <PageRow width="25%" column>
                <PageItem>
                    <TextInput title="Brand Name" id="brand_name" />
                </PageItem>
                <PageItem>
                    <TextInput title="Brand Website" id="brand_website" />
                </PageItem>
                <PageItem>
                    <TextInput title="Brand Product Category" id="brand_product_category" />
                </PageItem>
                <PageItem>
                    <TextInput title="Brand Instagram" id="brand_instagram" />
                </PageItem>
                <PageItem>
                    <TextInput title="Your Name" id="account_owner" />
                </PageItem>
                <PageItem>
                    <TextInput title="Your Position" id="owner_position" />
                </PageItem>
            </PageRow>
        </Page>
    </FormDataStore>
);

export default ProfilePage;
