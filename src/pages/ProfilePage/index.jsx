import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import TextInput from '../../components/FormComponents/TextInput';
import Footer from '../../layouts/footer/Footer';
import { getKeyValueDataStore } from '../../data-store/KeyValueDataStoreFactory';
import { apiGetProfile, apiSubmitProfile } from '../../utils/apiUtils';
import Layout from "../../layouts/Layout";
import { Row, Col } from 'react-bootstrap';


//TODO: refactor to redux-form & redux-form fields

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
                    // eslint-disable-next-line no-console
                    console.error(err);
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
        <Layout title='Create Your Profile' subTitle={`Let's get to know each other`}  >
                    <Row className="justify-content-center">
                        <Col xs={11} sm={6}  >
                            <Row className='flex-column mb-4' >
                                <TextInput formField="brandName" title="Brand Name" id="brand_name" value={state.brandName} handleChange={onTextInputChange} />
                            </Row>
                            <Row className='flex-column mb-4' >
                                <TextInput formField="brandWebsite" title="Brand Website" id="brand_website" value={state.brandWebsite} handleChange={onTextInputChange} />
                            </Row>
                            <Row className='flex-column mb-4' >
                                <TextInput formField="brandProductCategory" title="Brand Product Category" id="brand_product_category" value={state.brandProductCategory} handleChange={onTextInputChange} />
                            </Row>
                            <Row className='flex-column mb-4' >
                                <TextInput formField="brandInstagram" title="Brand Instagram" id="brand_instagram" value={state.brandInstagram} handleChange={onTextInputChange} />
                            </Row>
                            <Row className='flex-column mb-4' >
                                <TextInput formField="name" title="Your Name" id="account_owner" value={state.name} handleChange={onTextInputChange} />
                            </Row>
                            <Row className='flex-column mb-4' >
                                <TextInput formField="position" title="Your Position" id="owner_position" value={state.position} handleChange={onTextInputChange} />
                            </Row>
                        </Col>
                    </Row>
                    <h1 style={{ textAlign: 'center' }}>
                        {statusMessage}
                    </h1>

        </Layout>
        <Footer
            submitting={submitting}
            onSubmitClicked={submit}
        />
    </>
    );
};

export { ProfilePage, ContextProvider };
