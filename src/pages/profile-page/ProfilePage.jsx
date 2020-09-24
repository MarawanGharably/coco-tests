import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Page from '../../layouts/page-template/Page';
import PageRow from '../../components/page-row/PageRow';
import PageItem from '../../components/page-item/PageItem';
import TextInput from '../../components/text-input/TextInput';
import { getKeyValueDataStore } from '../../data-store/KeyValueDataStoreFactory';
import Footer from '../../layouts/footer/Footer';
import BodyWrapper from '../../layouts/body-wrapper/BodyWrapper';
import { apiGetProfile, apiSubmitProfile } from '../../utils/apiUtils';


const { Action, ContextProvider, useDataStore } = getKeyValueDataStore({
    brandName: '',
    brandWebsite: '',
    brandProductCategory: '',
    brandInstagram: '',
    name: '',
    position: '',
});

const ProfilePage = () => {
    const [submitting, setSubmitting] = useState(false);
    const [statusMessage, setStatusMessage] = useState('');

    const [state, dispatch] = useDataStore();
    const history = useHistory();

    useEffect(() => {
        apiGetProfile()
            .then((response) => {
                dispatch({
                    type: Action.SET_KEY_VALUE,
                    payload: {
                        brandName: response.brand_name,
                        brandWebsite: response.brand_website,
                        brandProductCategory: response.brand_product_category,
                        brandInstagram: response.brand_instagram,
                        name: response.account_owner,
                        position: response.owner_position,
                    },
                });
            }).catch((err) => {
                const statusCode = err.status;
                if (statusCode === 401) {
                    console.error('Unauthorized'); // eslint-disable-line
                    history.push('/login');
                } else {
                    console.error(err); // eslint-disable-line
                }
            });
    }, [dispatch, history]);


    const onSubmitFailed = (err) => {
        setSubmitting(false);
        console.error(err); // eslint-disable-line
        const statusCode = err.status;
        if (statusCode === 400) {
            setStatusMessage(err.statusText);
        } else if (statusCode === 401) {
            history.push('/login');
        }
    };

    const submit = async () => {
        setSubmitting(true);
        setStatusMessage('');

        const {
            brandName, brandWebsite, brandProductCategory, brandInstagram, name, position,
        } = state;
        const payload = {
            brand_name: brandName,
            brand_website: brandWebsite,
            brand_product_category: brandProductCategory,
            brand_instagram: brandInstagram,
            account_owner: name,
            owner_position: position,
        };
        apiSubmitProfile(payload)
            .then(() => {
                setSubmitting(false);
                setStatusMessage('Data Updated');
            }).catch((err) => {
                onSubmitFailed(err);
            });
    };

    const onTextInputChange = (e) => {
        e.persist();
        const { id, value } = e.target;
        dispatch({
            type: Action.SET_KEY_VALUE,
            payload: { [id]: value },
        });
    };

    return (
        <>
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
                    <h1 style={{ textAlign: 'center' }}>
                        {statusMessage}
                    </h1>
                </Page>
            </BodyWrapper>
            <Footer
                submitting={submitting}
                onSubmitClicked={submit}
            />
        </>
    );
};

export { ProfilePage, ContextProvider };
