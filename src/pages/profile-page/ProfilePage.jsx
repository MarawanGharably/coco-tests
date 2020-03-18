import React from 'react';
import Page from '../../layouts/page-template/Page';
import PageRow from '../../components/page-row/PageRow';
import PageItem from '../../components/page-item/PageItem';
import TextInput from '../../components/text-input/TextInput';
import { getKeyValueDataStore } from '../../data-store/KeyValueDataStoreFactory';
import Footer from '../../layouts/footer/Footer';
import BodyWrapper from '../../layouts/body-wrapper/BodyWrapper'

const { Action, ContextProvider, useDataStore } = getKeyValueDataStore({
    brandName: '',
    brandWebsite: '',
    brandProductCategory: '',
    brandInstagram: '',
    name: '',
    position: '',
});

const ProfilePage = () => {
    const [state, dispatch] = useDataStore();

    const onTextInputChange = (e) => {
        e.persist();
        const { id, value } = e.target;
        dispatch({
            type: Action.SET_KEY_VALUE,
            payload: { [id]: value },
        });
    };

    return (
        <React.Fragment>
            <BodyWrapper>
                <Page pageTitle="Create Your Profile" pageSubTitle="Let's get to know each other">
                    <PageRow width="25%" column>
                        <PageItem>
                            <TextInput formField="brandName" title="Brand Name" id="brand_name" value={state.brandName} handleChange={onTextInputChange} />
                        </PageItem>
                        <PageItem>
                            <TextInput formField="brandWebsite" title="Brand Website" id="brand_website" value={state.brandWebsite} handleChange={onTextInputChange} />
                        </PageItem>
                        <PageItem>
                            <TextInput formField="brandProductCategory" title="Brand Product Category" id="brand_product_category" value={state.brandProductCategory} handleChange={onTextInputChange} />
                        </PageItem>
                        <PageItem>
                            <TextInput formField="brandInstagram" title="Brand Instagram" id="brand_instagram" value={state.brandInstagram} handleChange={onTextInputChange} />
                        </PageItem>
                        <PageItem>
                            <TextInput formField="name" title="Your Name" id="account_owner" value={state.name} handleChange={onTextInputChange} />
                        </PageItem>
                        <PageItem>
                            <TextInput formField="position" title="Your Position" id="owner_position" value={state.position} handleChange={onTextInputChange} />
                        </PageItem>
                    </PageRow>
                </Page>
            </BodyWrapper>
            <Footer />
        </React.Fragment>
    );
};


export { ProfilePage, ContextProvider };
