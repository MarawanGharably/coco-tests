import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { Input } from '../../_formFields';
import SubmitButton from '../../../FormComponents/SubmitButton';
import { isValidEmail } from '../../../../utils/validation';
import './LogInForm.scss';

// Actions
import { logIn } from '../../../../store/actions';

class LogInForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false,
            submitting: false,
        };
    }

    handleSubmit = (values) => {
        // eslint-disable-next-line no-shadow
        const { logIn, history } = this.props;
        const { email, password } = values;

        this.setState({ submitting: true, error: false });

        logIn(email, password)
            .then(() => {
                history.push('/');
            })
            .catch((err) => {
                const statusCode = err?.status;
                const api_error_code = err?.data?.error_code || null;

                console.error('Login Error', { err, statusCode, api_error_code }); // eslint-disable-line
                if (api_error_code) this.setState({ submitting: false, error: err.data });
                else {
                    const errorData = { error_code: 'DEFAULT_ERROR_CODE', message: 'Server error, please try again later.' };
                    this.setState({ submitting: false, error: errorData });
                }
            });
    };

    render() {
        const { submitting, error } = this.state;
        const { handleSubmit } = this.props;

        return (
            <form onSubmit={handleSubmit(this.handleSubmit)} style={{ width: '100%' }} className='authFormStyling'>
                <Field name="email" type="email" label="Email" component={Input} placeholder="email" />
                <Field name="password" type="password" label="Password" component={Input} placeholder="password" />

                <section className="login-page-helper-section flex">
                    <div>
                        Don&apos;t have an account?<br/>
                        <a href="mailto:contact@shopobsess.co"> Send us an email</a>
                    </div>
                    <a href="/reset-password" className="forget-password" style={{ fontWeight: 'normal' }}>
                        Forgot password?
                    </a>
                </section>

                <div className="flex flex-center page-row mb-4">
                    <SubmitButton submitting={submitting} />
                </div>

                <ErrorMessage error={error} />
            </form>
        );
    }
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

LogInForm.propTypes = {
    logIn: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    history: PropTypes.func.isRequired,
};

// eslint-disable-next-line no-class-assign
LogInForm = reduxForm({
    form: 'LogInForm',
    validate,
})(LogInForm);

export default connect(null, { logIn })(withRouter(LogInForm));
