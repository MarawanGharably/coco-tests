import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { Input } from '../_formFields';
import SubmitButton from '../../submit-button/SubmitButton';
import { isValidEmail, isValidPassword } from '../../../utils/validation';

// Actions
import { logIn } from '../../../store/actions';

class LogInForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errorMessage: false,
            submitting: false,
        };
    }

    handleSubmit = values => {
        // eslint-disable-next-line no-shadow
        const { logIn, history } = this.props;
        const { email, password } = values;

        this.setState({ submitting: true, errorMessage: false });

        logIn(email, password)
            .then(() => {
                history.push('/');
            })
            .catch(err => {
                const statusCode = err?.status;
                console.error('Login Error', { err, statusCode }); // eslint-disable-line

                if (statusCode === 400) {
                    this.setState({ submitting: false, errorMessage: 'Invalid input, please try again.' });
                } else if (statusCode === 401 || statusCode === 403) {
                    this.setState({ submitting: false, errorMessage: 'Wrong email or password.' });
                } else {
                    this.setState({ submitting: false, errorMessage: 'Server error, please try again later.' });
                }
            });
    };

    render() {
        const { submitting, errorMessage } = this.state;
        const { handleSubmit } = this.props;

        return (
            <form onSubmit={handleSubmit(this.handleSubmit)} style={{ width: '100%' }}>
                <Field name="email" type="email" label="Email" component={Input} placeholder="email" />
                <Field name="password" type="password" label="Password" component={Input} placeholder="password" />

                <section className="login-page-helper-section flex">
                    <div>
                        Don&apos;t have an account?
                        <a href="mailto:contact@shopobsess.co"> Send us an email</a>
                    </div>
                    <a href="/reset-password" className="forget-password" style={{ fontWeight: 'normal' }}>
                        Forgot password?
                    </a>
                </section>

                <div className="flex flex-center page-row">
                    <SubmitButton submitting={submitting} />
                </div>

                <h1 style={{ textAlign: 'center' }}>{errorMessage}</h1>
            </form>
        );
    }
}

const validate = values => {
    const errors = {};
    if (!values.email || isValidEmail(values.email) !== true) errors.email = 'Email is not valid';
    if (!values.password || !isValidPassword(values.password)) errors.password = 'Password must be at least 8 characters long, contain uppercase and lowercase letters and numbers';
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
