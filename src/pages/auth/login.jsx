import React, {useState} from 'react';
import { Row, Col } from 'react-bootstrap';
import Link from "next/link";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {withRouter} from "next/router";
import Layout from '../../components/layouts/Layout';
import {Field, reduxForm} from "redux-form";
import {Input} from "../../components/ReduxForms/_formFields";
import SubmitButton from "../../components/ReduxForms/commonUI/SubmitButton";
import {isValidEmail} from "../../utils/validation";
import {logIn} from "../../APImethods/AuthAPI";
import styles from "../../assets/scss/LogInForm.module.scss";

let LoginPage =(props) =>{
    const [ status, setStatus ] = useState();
    const [ submitting, setSubmitting] = useState();
    const { handleSubmit, logIn, router } =  props;

    const onSubmit = (values) => {
        const { email, password } = values;

        setSubmitting(true);
        logIn(email, password)
            .then(() => {
                router.push('/');
            })
            .catch((err) => {
                const statusCode = err?.status;
                const api_error_code = err?.data?.error_code || null;
                console.error('Login Error', { err, statusCode, api_error_code }); // eslint-disable-line

                if (api_error_code) setStatus({error:true, message:'Error'});
                else {
                    const errorData = { error_code: 'DEFAULT_ERROR_CODE', message: 'Server error, please try again later.' };
                    setStatus({...errorData, ...{error:true}});
                }
            }).finally(()=>{
            setSubmitting(false);
        });
    };

    return (
        <Layout title="Login" subTitle="Welcome back">
            <Row className="justify-content-center mt-3">
                <Col xs={12} sm={10} md={7}>
            

                    <form onSubmit={handleSubmit(onSubmit)} className='authFormStyling'>
                        <Field name="email" type="email" label="Email" component={Input} placeholder="email" />
                        <Field name="password" type="password" label="Password" component={Input} placeholder="password" />

                        <section className={`${styles['login-page-helper-section']} d-flex`} >
                            <div>
                                Don&apos;t have an account?<br/>
                                <a href="mailto:contact@sobsessvr.com"> Send us an email</a>
                            </div>
                            <Link href="/auth/reset-password" className="forget-password" style={{ fontWeight: 'normal' }}>
                                Forgot password?
                            </Link>
                        </section>

                        <div className="d-flex  justify-content-center mb-4">
                            <SubmitButton submitting={submitting} />
                        </div>

                        <ErrorMessage error={status?.error? status :false} />
                    </form>
                </Col>
            </Row>
        </Layout>
    );
}


const ErrorMessage = ({ error }) => {
    if (!error) return false;
    const { message, error_code } = error;

    if (error_code === 'ACCOUNT_NOT_VERIFIED') {
        return (<h4 className='text-danger' style={{ textAlign: 'center' }}>
            Account registration is not completed.
            <br />
            Please, verify your email address first.
        </h4>);
    }

    return <h4 className='text-danger' style={{ textAlign: 'center' }}>{message}</h4>;
};

const validate = (values) => {
    const errors = {};
    if (!values.email || isValidEmail(values.email) !== true) errors.email = 'Email is not valid';
    if (!values.password ) errors.password = 'Password cannot be empty';
    return errors;
};

LoginPage.propTypes = {
    logIn: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
};

// eslint-disable-next-line no-class-assign
LoginPage = reduxForm({
    form: 'LoginPage',
    validate,
})(LoginPage);

export default connect(null, { logIn })(withRouter(LoginPage));