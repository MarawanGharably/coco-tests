import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { useRouter } from 'next/router';
import { Row, Col } from 'react-bootstrap';
import SubmitButton from '../components/FormComponents/SubmitButton';
import Layout from '../components/layouts/Layout';
import { Input } from '../components/ReduxForms/_formFields';

// Redux Actions
import { resetPassword } from '../APImethods/AuthAPI';


/*
 * Reset user password page
 * users landing on this page via link format create.shopobsess.com/password?a=username&b=password
 */

let ResetUserPasswordWithParamsPage = (props) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [submitting, setSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const {a: email, b:password} = router.query;
    console.log({router, email, password});

    const onSubmit = async (values) => {
        setSubmitting(true);
        setErrorMessage('');
        dispatch(resetPassword(email, password, values.password))
            .then((res) => {
                router.push('/');
            })
            .catch((err) => {
                console.error('Error', err); // eslint-disable-line
                setSubmitting(false);
                setErrorMessage(err?.message || 'Server error, please try again later.');
            });
    };

    return (
        <Layout title="Set Your Password" subTitle="Let's make it official">
            <Row className="justify-content-center mt-5">
                <Col xs={11} sm={6}>
                    <form onSubmit={props.handleSubmit(onSubmit)} style={{ width: '100%' }} className="authFormStyling">
                        <Field name="password" type="password" label="Password" component={Input} placeholder="password" />

                        <Row className="mb-4 justify-content-center">
                            <SubmitButton submitting={submitting} />
                        </Row>
                    </form>

                    <h1 className="align-self-center">{errorMessage}</h1>
                </Col>
            </Row>
        </Layout>
    );
};

const validate = (values) => {
    const errors = {};
    if (!values.password) errors.password = 'Password cannot be empty';
    return errors;
};

export default reduxForm({
    form: 'ResetUserPassword',
    validate,
})(ResetUserPasswordWithParamsPage);
