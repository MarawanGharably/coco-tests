import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import { Row } from 'react-bootstrap';
import { Input } from '../../_formFields';
import SubmitButton from '../../../FormComponents/SubmitButton';


// Actions
import { resetPasswordConfirmCode } from '../../../../APImethods/AuthAPI';

class ResetPasswordForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errorMessage: false,
            submitting: false,
        };
    }

    handleSubmit = values => {
        // eslint-disable-next-line camelcase
        const { code, new_password } = values;
        const { email, onSuccessSubmitCallback } = this.props;
        this.setState({ submitting: true, errorMessage: false });

        resetPasswordConfirmCode(email, code, new_password)
            .then(() => {
                onSuccessSubmitCallback();
            })
            .catch(err => {
                this.setState({ submitting: false });
                this.errorHandler(err);
            });
    };

    errorHandler = err => {
        const errorCode = err.data && err.data.error_code ? err.data.error_code : false;

        if (['INVALID_PASSWORD', 'INVALID_PARAMETERS', 'CODE_MISMATCH', 'CODE_EXPIRED', 'LIMIT_EXCEEDED'].includes(errorCode)) {
            this.setState({ errorMessage: err.data.message });
        } else this.setState({ errorMessage: 'Server error, please try again later.' });
    };

    render() {
        const { submitting, errorMessage } = this.state;
        const { verificationCodeStatus, handleSubmit } = this.props;

        return (
            <form onSubmit={handleSubmit(this.handleSubmit)}   className='d-flex flex-column authFormStyling'>
                <p style={{ fontSize: '2em', textAlign: 'center' }}>
                    Your Verification Code was sent on &nbsp;
                    {verificationCodeStatus.Destination}
                </p>
                <p style={{ fontSize: '2em', textAlign: 'center' }}>Please, insert your code to continue</p>

                <Field name="code" label="Verification Code" component={Input} />
                <Field name="new_password" type="password" label="New Password" component={Input} />

                <SubmitButton submitting={submitting} className='align-self-center'/>

                <Row className='justify-content-center'>
                    <h1>{errorMessage}</h1>
                </Row>

            </form>
        );
    }
}

// TODO: password validation
const validate = values => {
    const errors = {};
    if (!values.code || values.code.length < 6) errors.code = 'Code is not valid';
    if (!values.new_password) errors.new_password = 'Password is not valid';

    return errors;
};

ResetPasswordForm.propTypes = {
    email: PropTypes.string,
    handleSubmit: PropTypes.func.isRequired,
    onSuccessSubmitCallback: PropTypes.func.isRequired,
    verificationCodeStatus: PropTypes.InstanceOf(PropTypes.Object).isRequired,
};

ResetPasswordForm.defaultProps = {
    email: null,
};

export default reduxForm({
    form: 'ResetPasswordForm',
    destroyOnUnmount: true,
    enableReinitialize:false,
    validate,
})(ResetPasswordForm);
