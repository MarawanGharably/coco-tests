import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import { Input } from '../../_formFields';
import SubmitButton from '../../../submit-button/SubmitButton';
import PageRow from '../../../page-row/PageRow';
import PageItem from '../../../page-item/PageItem';

// Actions
import { resetPasswordConfirmCode } from '../../../../store/actions';

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
            <form onSubmit={handleSubmit(this.handleSubmit)} style={{ width: '100%' }}>
                <p style={{ fontSize: '2em', textAlign: 'center' }}>
                    Your Verification Code was sent on &nbsp;
                    {verificationCodeStatus.Destination}
                </p>
                <p style={{ fontSize: '2em', textAlign: 'center' }}>Please, insert your code to continue</p>

                <Field name="code" label="Verification Code" component={Input} placeholder="" />
                <Field name="new_password" type="password" label="New Password" component={Input} />

                <PageRow width="100%">
                    <PageItem>
                        <SubmitButton submitting={submitting} />
                    </PageItem>
                </PageRow>

                <div className="flex flex-center page-row">
                    <h1 style={{ textAlign: 'center' }}>{errorMessage}</h1>
                </div>
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
    validate,
})(ResetPasswordForm);
