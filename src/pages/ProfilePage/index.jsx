import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import TextInput from '../../components/FormComponents/TextInput';
import Footer from '../../layouts/footer/Footer';
import { apiSubmitProfile } from '../../utils/apiUtils';
import Layout from "../../layouts/Layout";
import { Row, Col } from 'react-bootstrap';
import { setKW } from '../../store/actions/kwActions';

//TODO: refactor to redux-form & redux-form fields



export default function ProfilePage () {
    const dispatch = useDispatch();
    const history = useHistory();

    const [submitting, setSubmitting] = useState(false);
    const [statusMessage, setStatusMessage] = useState('');
    const KW = useSelector(store => store['KW']);


    // TODO: remove it if we dont need it. (delete reducer as well)
    // TODO: For new client creation we have nothing to fetch.

    // useEffect(() => {
    //     apiGetProfile()
    //         .then((response) => {
    //             dispatch(setKW({
    //                 brandName: response.brand_name,
    //                 brandWebsite: response.brand_website,
    //                 brandProductCategory: response.brand_product_category,
    //                 brandInstagram: response.brand_instagram,
    //                 name: response.account_owner,
    //                 position: response.owner_position,
    //             }))
    //         }).catch((err) => {
    //             const statusCode = err.status;
    //             if (statusCode === 401) {
    //                 console.error('Unauthorized'); // eslint-disable-line
    //                 history.push('/login');
    //             } else {
    //                 // eslint-disable-next-line no-console
    //                 console.error(err);
    //             }
    //         });
    // }, [  history]);


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

        const payload = {
            brand_name: KW.brandName,
            brand_website: KW.brandWebsite,
            brand_product_category: KW.brandProductCategory,
            brand_instagram: KW.brandInstagram,
            account_owner: KW.name,
            owner_position: KW.position,
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
        dispatch(setKW({ [id]: value }))
    };

    return (
        <>
        <Layout title='Create Your Profile' subTitle={`Let's get to know each other`}  >
                    <Row className="justify-content-center">
                        <Col xs={11} sm={6}  >
                            <Row className='flex-column mb-4' >
                                <TextInput formField="brandName" title="Brand Name" id="brand_name" value={KW.brandName} handleChange={onTextInputChange} />
                            </Row>
                            <Row className='flex-column mb-4' >
                                <TextInput formField="brandWebsite" title="Brand Website" id="brand_website" value={KW.brandWebsite} handleChange={onTextInputChange} />
                            </Row>
                            <Row className='flex-column mb-4' >
                                <TextInput formField="brandProductCategory" title="Brand Product Category" id="brand_product_category" value={KW.brandProductCategory} handleChange={onTextInputChange} />
                            </Row>
                            <Row className='flex-column mb-4' >
                                <TextInput formField="brandInstagram" title="Brand Instagram" id="brand_instagram" value={KW.brandInstagram} handleChange={onTextInputChange} />
                            </Row>
                            <Row className='flex-column mb-4' >
                                <TextInput formField="name" title="Your Name" id="account_owner" value={KW.name} handleChange={onTextInputChange} />
                            </Row>
                            <Row className='flex-column mb-4' >
                                <TextInput formField="position" title="Your Position" id="owner_position" value={KW.position} handleChange={onTextInputChange} />
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


