import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Page from '../../layouts/page-template/Page';
import PageRow from '../../components/page-row/PageRow';
import PageItem from '../../components/page-item/PageItem';
import TextInput from '../../components/text-input/TextInput';
import { getKeyValueDataStore } from '../../data-store/KeyValueDataStoreFactory';
import Footer from '../../layouts/footer/Footer';
import BodyWrapper from '../../layouts/body-wrapper/BodyWrapper'
import { API_URL } from '../../utils/envVariables';

const PROFILE_URL = `${API_URL}/client/profile`;

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
        (async () => {
            const response = await fetch(PROFILE_URL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            const responseJSON = await response.json();
            dispatch({
                type: Action.SET_KEY_VALUE,
                payload: {
                    brandName: responseJSON['brand_name'],
                    brandWebsite: responseJSON['brand_website'],
                    brandProductCategory: responseJSON['brand_product_category'],
                    brandInstagram: responseJSON['brand_instagram'],
                    name: responseJSON['account_owner'],
                    position: responseJSON['owner_position'],
                },
            });
        })();
    }, []);

    const submit = async () => {
        setSubmitting(true);
        setStatusMessage('');

        try {
            const {
                brandName, brandWebsite, brandProductCategory, brandInstagram, name, position
            } = state;
            const payload = {
                'brand_name': brandName,
                'brand_website': brandWebsite,
                'brand_product_category': brandProductCategory,
                'brand_instagram': brandInstagram,
                'account_owner': name,
                'owner_position': position,
            }
            const response = await fetch(PROFILE_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(payload),
            });

            const statusCode = response.status;
            if (statusCode === 200) {
                setStatusMessage('Data Updated');
            } else if (statusCode === 400) {
                console.error('Bad request'); // eslint-disable-line
                setStatusMessage('Invalid data');
            } else if (statusCode === 401) {
                console.error('Unauthorized'); // eslint-disable-line
                history.push('/login');
            } else {
                throw new Error(response.statusText);
            }
        } catch (error) {
            console.error(error); // eslint-disable-line
            setStatusMessage('Server error, please try again later.');
        }
        setSubmitting(false);
    }

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
                    <h1 style={{ textAlign: 'center' }}>
                        {statusMessage}
                    </h1>
                </Page>
            </BodyWrapper>
            <Footer
                submitting={submitting}
                onSubmitClicked={submit}
            />
        </React.Fragment>
    );
};

export { ProfilePage, ContextProvider };
